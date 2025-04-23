
import { Player } from '@/types/player';
import { initialPlayers } from './initialPlayersData';

// Load players from localStorage or use initialPlayers if not found
export const loadPlayers = (): Player[] => {
  try {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      return JSON.parse(savedPlayers);
    }
  } catch (error) {
    console.error('Failed to load players from localStorage:', error);
  }
  
  // Save initial players to localStorage on first load
  try {
    localStorage.setItem('players', JSON.stringify(initialPlayers));
  } catch (error) {
    console.error('Failed to save initial players to localStorage:', error);
  }
  
  return initialPlayers;
};

// Save players to localStorage
export const savePlayers = (players: Player[]): void => {
  try {
    localStorage.setItem('players', JSON.stringify(players));
  } catch (error) {
    console.error('Failed to save players to localStorage:', error);
  }
};
