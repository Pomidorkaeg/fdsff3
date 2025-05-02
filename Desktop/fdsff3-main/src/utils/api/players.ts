import { Player } from '../../types/player';
import { initialPlayers } from '../players/initialPlayersData';

let players: Player[] = [...initialPlayers];

export const fetchPlayers = async (): Promise<Player[]> => {
  return [...players];
};

export const addPlayer = async (player: Omit<Player, 'id' | 'createdAt' | 'updatedAt'>): Promise<Player> => {
  const newPlayer: Player = {
    ...player,
    id: `player${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Player;
  players.push(newPlayer);
  return newPlayer;
};

export const updatePlayer = async (id: string, player: Partial<Player>): Promise<Player> => {
  const idx = players.findIndex(p => p.id === id);
  if (idx === -1) throw new Error('Player not found');
  players[idx] = { ...players[idx], ...player, updatedAt: new Date().toISOString() };
  return players[idx];
};

export const deletePlayer = async (id: string): Promise<void> => {
  players = players.filter(p => p.id !== id);
}; 