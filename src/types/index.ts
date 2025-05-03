export interface Album {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  date: string;
  photoCount: number;
}

export interface Photo {
  id: string;
  albumId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  dateAdded: string;
  width: number;
  height: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface MSGraphResponse {
  value: any[];
  '@odata.nextLink'?: string;
}