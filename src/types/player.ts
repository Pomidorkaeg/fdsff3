export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
  number?: number;
  height?: number;
  weight?: number;
  preferredFoot?: 'left' | 'right' | 'both';
  biography?: string;
  image?: string;
  isActive: boolean;
  team: string;
  joinedDate: string;
  contractEndDate?: string;
  stats?: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    cleanSheets?: number;
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  achievements?: {
    title: string;
    year: number;
    description?: string;
  }[];
}
