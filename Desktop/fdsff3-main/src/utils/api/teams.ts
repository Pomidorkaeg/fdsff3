import { Team } from '../../types/team';
import { getTeamsData } from '../teamsData';

let teams: Team[] = getTeamsData();

export const fetchTeams = async (): Promise<Team[]> => {
  return [...teams];
};

export const addTeam = async (team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> => {
  const newTeam: Team = {
    ...team,
    id: `team${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  } as Team;
  teams.push(newTeam);
  return newTeam;
};

export const updateTeam = async (id: string, team: Partial<Team>): Promise<Team> => {
  const idx = teams.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Team not found');
  teams[idx] = { ...teams[idx], ...team, updatedAt: new Date().toISOString() };
  return teams[idx];
};

export const deleteTeam = async (id: string): Promise<void> => {
  teams = teams.filter(t => t.id !== id);
}; 