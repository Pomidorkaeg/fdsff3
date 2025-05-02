export type PlayerPosition = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
export type PreferredFoot = 'left' | 'right' | 'both';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: PlayerPosition;
  number?: number;
  dateOfBirth: string;
  nationality: string;
  height?: number;
  weight?: number;
  preferredFoot?: PreferredFoot;
  biography?: string;
  image?: string;
  contractEndDate?: string;
  isActive: boolean;
  stats?: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    cleanSheets: number;
  };
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  achievements?: string[];
}
