import { Team } from '../../types/team';
import { getAuthHeaders } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';
const TIMEOUT = 5000; // 5 seconds timeout

const fetchWithTimeout = async (url: string, options: RequestInit): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/teams`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching teams:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Превышено время ожидания ответа от сервера');
      }
    }
    throw error;
  }
};

export const addTeam = async (team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> => {
  try {
    const response = await fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(team),
    });

    if (!response.ok) {
      throw new Error('Failed to add team');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding team:', error);
    throw error;
  }
};

export const updateTeam = async (id: string, team: Partial<Team>): Promise<Team> => {
  try {
    const response = await fetch(`${API_URL}/teams/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(team),
    });

    if (!response.ok) {
      throw new Error('Failed to update team');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

export const deleteTeam = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/teams/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete team');
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
}; 