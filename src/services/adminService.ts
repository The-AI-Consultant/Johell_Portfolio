
import { Album, Photo } from '../types';

class AdminService {
  private static instance: AdminService;
  private albums: Album[] = [];
  private photos: Photo[] = [];
  
  private constructor() {
    // Initialize with sample data
    this.albums = JSON.parse(localStorage.getItem('albums') || '[]');
    this.photos = JSON.parse(localStorage.getItem('photos') || '[]');
  }

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  getAlbums(): Album[] {
    return this.albums;
  }

  getPhotos(albumId: string): Photo[] {
    return this.photos.filter(photo => photo.albumId === albumId);
  }

  createAlbum(name: string, description?: string): Album {
    const album: Album = {
      id: crypto.randomUUID(),
      name,
      description: description || '',
      date: new Date().toISOString(),
      photoCount: 0
    };
    
    this.albums.push(album);
    this.saveToStorage();
    return album;
  }

  async uploadPhoto(albumId: string, file: File): Promise<Photo> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photo: Photo = {
          id: crypto.randomUUID(),
          albumId,
          name: file.name,
          url: reader.result as string,
          thumbnailUrl: reader.result as string,
          dateAdded: new Date().toISOString(),
          width: 800,
          height: 600
        };
        
        this.photos.push(photo);
        const album = this.albums.find(a => a.id === albumId);
        if (album) {
          album.photoCount++;
          album.coverImage = photo.url;
        }
        this.saveToStorage();
        resolve(photo);
      };
      reader.readAsDataURL(file);
    });
  }

  private saveToStorage() {
    localStorage.setItem('albums', JSON.stringify(this.albums));
    localStorage.setItem('photos', JSON.stringify(this.photos));
  }
}

export const adminService = AdminService.getInstance();
