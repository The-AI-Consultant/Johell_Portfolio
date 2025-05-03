
import { Album, Photo } from '../types';

export class StorageService {
  private async uploadToStorage(file: File, path: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`/api/upload/${path}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    return await response.text(); // Returns the URL
  }

  async getAlbums(): Promise<Album[]> {
    const response = await fetch('/api/albums');
    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }
    return await response.json();
  }

  async createAlbum(name: string): Promise<Album> {
    const response = await fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create album');
    }
    
    return await response.json();
  }

  async uploadPhoto(albumId: string, file: File): Promise<Photo> {
    const url = await this.uploadToStorage(file, `albums/${albumId}`);
    
    const photo: Photo = {
      id: crypto.randomUUID(),
      albumId,
      name: file.name,
      url,
      thumbnailUrl: url,
      dateAdded: new Date().toISOString(),
      width: 800, // You can get actual dimensions after upload
      height: 600
    };
    
    return photo;
  }
}

export const storageService = new StorageService();
