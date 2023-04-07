export interface PhotoDTO {
  id: string;
  urls: { small: string; regular: string };
  likes: number;
  color: string;
  alt_description: string;
}

export interface ApiResponse {
  total: number;
  total_pages: number;
  results: PhotoDTO[];
}

export interface FullPhotoDTO extends PhotoDTO {
  description: string;
  user: {
    name: string;
    bio: string;
    location: string;
  };
  links: {
    download: string;
  };
  views: number;
}
