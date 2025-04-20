export interface Team {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  stadium: string;
  city: string;
  country: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  coach: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  squad: {
    players: string[]; // Array of player IDs
    staff: string[]; // Array of staff member IDs
  };
  stats?: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
  achievements?: {
    title: string;
    year: number;
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
