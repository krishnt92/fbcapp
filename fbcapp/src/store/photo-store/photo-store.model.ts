export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface PhotoResponse { 
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
}