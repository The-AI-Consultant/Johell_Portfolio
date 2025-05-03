
import { Album, Photo } from '../types';

export const getOneDriveService = async (token: string) => {
  return {
    getAlbums: async (): Promise<Album[]> => {
      // This is where you would implement the actual OneDrive API calls
      // For now, return an empty array since we're using local storage
      return [];
    },
    
    getPhotosFromAlbum: async (albumId: string): Promise<Photo[]> => {
      // This is where you would implement the actual OneDrive API calls
      // For now, return an empty array since we're using local storage
      return [];
    }
  };
};
