export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';

export interface Match {
  id: string;
  homeTeam: string; // Team ID
  awayTeam: string; // Team ID
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: MatchStatus;
  score?: {
    home: number;
    away: number;
    halftime?: {
      home: number;
      away: number;
    };
  };
  events?: {
    type: 'goal' | 'yellowCard' | 'redCard' | 'substitution' | 'penalty' | 'ownGoal';
    minute: number;
    player: string; // Player ID
    team: string; // Team ID
    description?: string;
  }[];
  attendance?: number;
  referee?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} 