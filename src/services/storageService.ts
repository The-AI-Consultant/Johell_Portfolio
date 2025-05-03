
import { Album, Photo } from '../types';

class StorageService {
  private albums: Album[] = [];
  private photos: Photo[] = [];

  async getAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async createAlbum(name: string): Promise<Album> {
    const album: Album = {
      id: crypto.randomUUID(),
      name,
      description: '',
      date: new Date().toISOString(),
      photoCount: 0
    };
    this.albums.push(album);
    return album;
  }

  async uploadPhoto(albumId: string, file: File): Promise<Photo> {
    const url = URL.createObjectURL(file);
    const photo: Photo = {
      id: crypto.randomUUID(),
      albumId,
      name: file.name,
      url,
      thumbnailUrl: url,
      dateAdded: new Date().toISOString(),
      width: 800,
      height: 600
    };
    this.photos.push(photo);
    return photo;
  }

  async getPhotosFromAlbum(albumId: string): Promise<Photo[]> {
    return this.photos.filter(photo => photo.albumId === albumId);
  }

  async deletePhoto(photoId: string): Promise<boolean> {
    const index = this.photos.findIndex(p => p.id === photoId);
    if (index !== -1) {
      this.photos.splice(index, 1);
      return true;
    }
    return false;
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    const index = this.albums.findIndex(a => a.id === albumId);
    if (index !== -1) {
      this.albums.splice(index, 1);
      this.photos = this.photos.filter(p => p.albumId !== albumId);
      return true;
    }
    return false;
  }
}

export const storageService = new StorageService();
