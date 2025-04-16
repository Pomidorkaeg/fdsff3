
import { Player } from '@/types/player';
import { loadPlayers, savePlayers } from './playerStorage';

// Initialize players array
let players: Player[] = loadPlayers();

// Get all players
export const getPlayersData = (): Player[] => {
  return [...players];
};

// Get players for a specific team
export const getPlayersByTeam = (teamId: string): Player[] => {
  return players.filter(player => player.teamId === teamId);
};

// Get a specific player by ID
export const getPlayerById = (id: string): Player | undefined => {
  return players.find(player => player.id === id);
};

// Update a player
export const updatePlayer = (updatedPlayer: Player): void => {
  players = players.map(player => 
    player.id === updatedPlayer.id ? updatedPlayer : player
  );
  
  // Save changes to localStorage
  savePlayers(players);
};

// Add a new player
export const createPlayer = (newPlayer: Player): void => {
  players.push(newPlayer);
  
  // Save changes to localStorage
  savePlayers(players);
};

// Delete a player
export const deletePlayer = (id: string): void => {
  players = players.filter(player => player.id !== id);
  
  // Save changes to localStorage
  savePlayers(players);
};
