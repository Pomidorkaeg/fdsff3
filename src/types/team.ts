export interface Team {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  country: string;
  city: string;
  stadium: string;
  capacity: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
  coach: {
    name: string;
    nationality: string;
    dateOfBirth: string;
    contractEndDate?: string;
  };
  players: string[]; // Array of player IDs
  staff?: {
    position: string;
    name: string;
    nationality: string;
  }[];
  achievements?: {
    title: string;
    year: number;
    description?: string;
  }[];
  isActive: boolean;
  league?: string;
  division?: string;
  season?: string;
}
