export interface Media {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'gallery';
  url: string;
  thumbnail?: string;
  uploadDate: string;
  author: string;
  category: 'match' | 'training' | 'event' | 'player' | 'other';
  tags?: string[];
  isPublished: boolean;
  views: number;
  likes: number;
  relatedMatches?: string[];
  relatedPlayers?: string[];
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    format?: string;
    size?: number;
  };
} 