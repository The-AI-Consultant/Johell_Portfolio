import { Client } from '@microsoft/microsoft-graph-client';
import { Album, Photo, MSGraphResponse } from '../types';

export class OneDriveService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
  }

  // Get folder ID by path
  async getFolderIdByPath(path: string): Promise<string | null> {
    try {
      const response = await this.client
        .api(`/me/drive/root:/${path}`)
        .get();
      
      return response.id;
    } catch (error) {
      console.error('Error getting folder ID:', error);
      return null;
    }
  }

  // Create a folder if it doesn't exist
  async createFolderIfNotExists(parentPath: string, folderName: string): Promise<string | null> {
    try {
      // Try to get folder first
      try {
        const path = parentPath ? `${parentPath}/${folderName}` : folderName;
        const folderId = await this.getFolderIdByPath(path);
        if (folderId) return folderId;
      } catch (error) {
        // Folder doesn't exist, continue to create it
      }

      // Get parent folder ID if provided
      let parentReference: any = { path: '/drive/root' };
      if (parentPath) {
        const parentId = await this.getFolderIdByPath(parentPath);
        if (parentId) {
          parentReference = { id: parentId };
        }
      }

      // Create the folder
      const response = await this.client
        .api('/me/drive/items/root/children')
        .post({
          name: folderName,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'rename',
          parentReference
        });
      
      return response.id;
    } catch (error) {
      console.error('Error creating folder:', error);
      return null;
    }
  }

  // Get all albums (based on folders in the Photos directory)
  async getAlbums(): Promise<Album[]> {
    try {
      // Create Photos folder if it doesn't exist
      await this.createFolderIfNotExists('', 'Photos');
      
      const response: MSGraphResponse = await this.client
        .api('/me/drive/root:/Photos:/children')
        .filter('folder ne null')
        .select('id,name,description,lastModifiedDateTime,folder')
        .get();
      
      const albums: Album[] = await Promise.all(
        response.value.map(async (item) => {
          // Get a thumbnail from the first image in the folder if available
          let coverImage = '';
          try {
            const folderContents = await this.client
              .api(`/me/drive/items/${item.id}/children`)
              .filter('file ne null and (endsWith(name, \'.jpg\') or endsWith(name, \'.jpeg\') or endsWith(name, \'.png\'))')
              .top(1)
              .get();
            
            if (folderContents.value.length > 0) {
              const thumbnailResponse = await this.client
                .api(`/me/drive/items/${folderContents.value[0].id}/thumbnails/0/medium`)
                .get();
              
              coverImage = thumbnailResponse.url;
            }
          } catch (error) {
            console.error('Error getting folder thumbnail:', error);
          }

          return {
            id: item.id,
            name: item.name,
            description: item.description || '',
            coverImage,
            date: item.lastModifiedDateTime,
            photoCount: item.folder.childCount
          };
        })
      );

      // Sort albums by date, newest first
      return albums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error getting albums:', error);
      return [];
    }
  }

  // Get photos from a specific album
  async getPhotosFromAlbum(albumId: string): Promise<Photo[]> {
    try {
      const response: MSGraphResponse = await this.client
        .api(`/me/drive/items/${albumId}/children`)
        .filter('file ne null and (endsWith(name, \'.jpg\') or endsWith(name, \'.jpeg\') or endsWith(name, \'.png\'))')
        .select('id,name,lastModifiedDateTime,file')
        .get();
      
      const photos: Photo[] = await Promise.all(
        response.value.map(async (item) => {
          // Get thumbnail and content URL
          const thumbnailResponse = await this.client
            .api(`/me/drive/items/${item.id}/thumbnails/0`)
            .get();
          
          // Estimate dimensions from the thumbnail
          const thumbnailMedium = thumbnailResponse.medium || thumbnailResponse.large || thumbnailResponse.small;
          
          return {
            id: item.id,
            albumId,
            name: item.name,
            url: thumbnailResponse.large ? thumbnailResponse.large.url : (await this.client.api(`/me/drive/items/${item.id}/content`).getUrl()),
            thumbnailUrl: thumbnailMedium.url,
            dateAdded: item.lastModifiedDateTime,
            width: thumbnailMedium.width || 800,
            height: thumbnailMedium.height || 600
          };
        })
      );

      // Sort photos by date, newest first
      return photos.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } catch (error) {
      console.error('Error getting photos:', error);
      return [];
    }
  }

  // Create a new album
  async createAlbum(albumName: string): Promise<Album | null> {
    try {
      const folderId = await this.createFolderIfNotExists('Photos', albumName);
      
      if (folderId) {
        const folderInfo = await this.client
          .api(`/me/drive/items/${folderId}`)
          .get();
        
        return {
          id: folderInfo.id,
          name: folderInfo.name,
          description: '',
          date: folderInfo.lastModifiedDateTime,
          photoCount: 0
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error creating album:', error);
      return null;
    }
  }

  // Upload a photo to an album
  async uploadPhoto(albumId: string, file: File): Promise<Photo | null> {
    try {
      // Get small upload URL for files under 4MB
      const uploadSession = await this.client
        .api(`/me/drive/items/${albumId}:/${file.name}:/content`)
        .put(file);
      
      if (uploadSession.id) {
        // Get the thumbnail
        const thumbnailResponse = await this.client
          .api(`/me/drive/items/${uploadSession.id}/thumbnails/0`)
          .get();
        
        const thumbnailMedium = thumbnailResponse.medium || thumbnailResponse.large || thumbnailResponse.small;
        
        return {
          id: uploadSession.id,
          albumId,
          name: file.name,
          url: thumbnailResponse.large ? thumbnailResponse.large.url : uploadSession.webUrl,
          thumbnailUrl: thumbnailMedium.url,
          dateAdded: uploadSession.lastModifiedDateTime,
          width: thumbnailMedium.width || 800,
          height: thumbnailMedium.height || 600
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error uploading photo:', error);
      return null;
    }
  }

  // Delete a photo
  async deletePhoto(photoId: string): Promise<boolean> {
    try {
      await this.client
        .api(`/me/drive/items/${photoId}`)
        .delete();
      
      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      return false;
    }
  }

  // Delete an album
  async deleteAlbum(albumId: string): Promise<boolean> {
    try {
      await this.client
        .api(`/me/drive/items/${albumId}`)
        .delete();
      
      return true;
    } catch (error) {
      console.error('Error deleting album:', error);
      return false;
    }
  }
}

// Create a service factory to avoid recreating the service
let oneDriveServiceInstance: OneDriveService | null = null;

export const getOneDriveService = async (accessToken: string): Promise<OneDriveService> => {
  if (!oneDriveServiceInstance || true) { // Always create a new instance to ensure token is fresh
    oneDriveServiceInstance = new OneDriveService(accessToken);
  }
  return oneDriveServiceInstance;
};