import { Match } from '../types/match';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';
const STORAGE_KEY = 'fc_matches';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const getLocalMatches = (): Match[] => {
  try {
    const matches = localStorage.getItem(STORAGE_KEY);
    return matches ? JSON.parse(matches) : [];
  } catch (error) {
    console.error('Error reading matches from localStorage:', error);
    return [];
  }
};

export const saveLocalMatches = (matches: Match[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch (error) {
    console.error('Error saving matches to localStorage:', error);
  }
};

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_URL}/api/matches`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

export const addMatch = async (match: Match): Promise<Match> => {
  try {
    const response = await fetch(`${API_URL}/api/matches`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(match),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add match');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding match:', error);
    throw error;
  }
};

export const updateMatch = async (match: Match): Promise<Match> => {
  try {
    const response = await fetch(`${API_URL}/api/matches/${match.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(match),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update match');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating match:', error);
    throw error;
  }
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete match');
    }
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
}; 