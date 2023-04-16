export interface PhotoDTO {
  id: string;
  urls: { small: string; regular: string };
  likes: number;
  alt_description: string;
  width: number;
  height: number;
}

export interface ApiResponse {
  total: number;
  total_pages: number;
  results: PhotoDTO[];
}

export type CardData = {
  id: string;
  imgSrc: string;
  likes: number;
  alt: string;
};

export interface TransformedApiResponse {
  total: number;
  totalPages: number;
  cards: CardData[];
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
  created_at: string;
}
