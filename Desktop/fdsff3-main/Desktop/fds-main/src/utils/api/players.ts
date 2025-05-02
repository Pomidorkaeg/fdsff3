import { Player } from '../../types/player';
import { getAuthHeaders } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const addPlayer = async (player: Omit<Player, 'id' | 'createdAt' | 'updatedAt'>): Promise<Player> => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      throw new Error('Failed to add player');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const updatePlayer = async (id: string, player: Partial<Player>): Promise<Player> => {
  try {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      throw new Error('Failed to update player');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

export const deletePlayer = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete player');
    }
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
}; 