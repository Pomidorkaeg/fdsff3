import { Player } from './player';
import { Team } from './team';
import { Match } from './match';
import { News } from './news';
import { Media } from './media';

export interface SiteData {
  players: Player[];
  teams: Team[];
  matches: Match[];
  news: News[];
  media: Media[];
  lastUpdated: string;
} 