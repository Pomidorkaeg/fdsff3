export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  image?: string;
  category: 'news' | 'match' | 'transfer' | 'academy' | 'club';
  tags?: string[];
  isPublished: boolean;
  views: number;
  likes: number;
  comments?: {
    id: string;
    author: string;
    content: string;
    date: string;
    likes: number;
  }[];
  relatedMatches?: string[];
  relatedPlayers?: string[];
} 