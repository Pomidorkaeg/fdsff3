import { Match } from '../types/match';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';
const STORAGE_KEY = 'fc_matches';

const DEFAULT_MATCHES: Match[] = [
  {
    id: '1',
    homeTeam: 'Гудаута',
    awayTeam: 'Динамо',
    date: '2024-03-15',
    time: '18:00',
    venue: 'Стадион им. Даура Ахвледиани',
    competition: 'Чемпионат Абхазии',
    status: 'scheduled',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    homeTeam: 'Гудаута',
    awayTeam: 'Нарт',
    date: '2024-03-22',
    time: '19:00',
    venue: 'Стадион им. Даура Ахвледиани',
    competition: 'Кубок Абхазии',
    status: 'scheduled',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
      console.log('API returned error, using default matches');
      return DEFAULT_MATCHES;
    }
    
    const data = await response.json();
    return data && data.length > 0 ? data : DEFAULT_MATCHES;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return DEFAULT_MATCHES;
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