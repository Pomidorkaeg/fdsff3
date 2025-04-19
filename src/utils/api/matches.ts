import { Match } from '@/hooks/useMatches';

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
    console.log('Fetching matches from API...');
    const response = await fetch(`${API_URL}/api/matches`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      console.log('API unavailable, using local storage');
      return getLocalMatches();
    }
    
    const data = await response.json();
    console.log('Successfully fetched matches from API');
    saveLocalMatches(data); // Сохраняем в localStorage как кэш
    return data;
  } catch (error) {
    console.log('Error fetching from API, using local storage:', error);
    return getLocalMatches();
  }
};

export const addMatch = async (match: Match): Promise<Match> => {
  try {
    console.log('Adding match to API...');
    const response = await fetch(`${API_URL}/api/matches`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(match),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add match to API');
    }
    
    const data = await response.json();
    const localMatches = getLocalMatches();
    localMatches.push(data);
    saveLocalMatches(localMatches);
    return data;
  } catch (error) {
    console.log('Error adding to API, using local storage:', error);
    const localMatches = getLocalMatches();
    const newMatch = { ...match, id: Date.now().toString() };
    localMatches.push(newMatch);
    saveLocalMatches(localMatches);
    return newMatch;
  }
};

export const updateMatch = async (match: Match): Promise<Match> => {
  try {
    console.log('Updating match in API...');
    const response = await fetch(`${API_URL}/api/matches/${match.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(match),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update match in API');
    }
    
    const data = await response.json();
    const localMatches = getLocalMatches();
    const index = localMatches.findIndex(m => m.id === match.id);
    if (index !== -1) {
      localMatches[index] = data;
      saveLocalMatches(localMatches);
    }
    return data;
  } catch (error) {
    console.log('Error updating in API, using local storage:', error);
    const localMatches = getLocalMatches();
    const index = localMatches.findIndex(m => m.id === match.id);
    if (index !== -1) {
      localMatches[index] = match;
      saveLocalMatches(localMatches);
    }
    return match;
  }
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  try {
    console.log('Deleting match from API...');
    const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete match from API');
    }
    
    const localMatches = getLocalMatches();
    const filteredMatches = localMatches.filter(m => m.id !== matchId);
    saveLocalMatches(filteredMatches);
  } catch (error) {
    console.log('Error deleting from API, using local storage:', error);
    const localMatches = getLocalMatches();
    const filteredMatches = localMatches.filter(m => m.id !== matchId);
    saveLocalMatches(filteredMatches);
  }
}; 