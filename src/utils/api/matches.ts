import { Match } from '@/hooks/useMatches';

// Используем production URL для API
const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_URL}/api/matches`);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

export const addMatch = async (match: Match): Promise<Match> => {
  const response = await fetch(`${API_URL}/api/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(match),
  });
  if (!response.ok) {
    throw new Error('Failed to add match');
  }
  return await response.json();
};

export const updateMatch = async (match: Match): Promise<Match> => {
  const response = await fetch(`${API_URL}/api/matches/${match.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(match),
  });
  if (!response.ok) {
    throw new Error('Failed to update match');
  }
  return await response.json();
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete match');
  }
}; 