
import { Album, Photo } from '../types';

class StorageService {
  private albums: Album[] = [];
  private photos: Photo[] = [];
  private storage = navigator.storage || window.localStorage;

  async getAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async createAlbum(name: string, description?: string): Promise<Album> {
    const album: Album = {
      id: crypto.randomUUID(),
      name,
      description: description || '',
      date: new Date().toISOString(),
      photoCount: 0
    };
    this.albums.push(album);
    return album;
  }

  async uploadPhoto(albumId: string, file: File): Promise<Photo> {
    // Create blob URL for the uploaded file
    const url = URL.createObjectURL(file);
    
    // Create thumbnail using canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    const thumbnailPromise = new Promise<string>((resolve) => {
      img.onload = () => {
        const MAX_SIZE = 400;
        const scale = Math.min(MAX_SIZE / img.width, MAX_SIZE / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = url;
    });

    const thumbnailUrl = await thumbnailPromise;

    const photo: Photo = {
      id: crypto.randomUUID(),
      albumId,
      name: file.name,
      url,
      thumbnailUrl,
      dateAdded: new Date().toISOString(),
      width: img.width,
      height: img.height
    };

    this.photos.push(photo);
    
    // Update album photo count
    const album = this.albums.find(a => a.id === albumId);
    if (album) {
      album.photoCount++;
      if (!album.coverImage) {
        album.coverImage = thumbnailUrl;
      }
    }

    return photo;
  }

  async getPhotosFromAlbum(albumId: string): Promise<Photo[]> {
    return this.photos.filter(photo => photo.albumId === albumId);
  }

  async deletePhoto(photoId: string): Promise<boolean> {
    const index = this.photos.findIndex(p => p.id === photoId);
    if (index !== -1) {
      const photo = this.photos[index];
      URL.revokeObjectURL(photo.url);
      this.photos.splice(index, 1);
      
      // Update album photo count
      const album = this.albums.find(a => a.id === photo.albumId);
      if (album) {
        album.photoCount--;
      }
      
      return true;
    }
    return false;
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    const index = this.albums.findIndex(a => a.id === albumId);
    if (index !== -1) {
      // Revoke all photo URLs in this album
      const albumPhotos = this.photos.filter(p => p.albumId === albumId);
      albumPhotos.forEach(photo => URL.revokeObjectURL(photo.url));
      
      this.albums.splice(index, 1);
      this.photos = this.photos.filter(p => p.albumId !== albumId);
      return true;
    }
    return false;
  }
}

export const storageService = new StorageService();
