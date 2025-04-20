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
    // Пытаемся получить данные из API
    const response = await fetch(`${API_URL}/api/matches`, {
      headers: getAuthHeaders()
    });
    
    if (response.ok) {
      const apiMatches = await response.json();
      // Если API вернул данные, обновляем локальное хранилище
      if (apiMatches && apiMatches.length > 0) {
        saveLocalMatches(apiMatches);
        return apiMatches;
      }
    }
    
    // Если API недоступен или вернул пустой список, используем локальные данные
    const localMatches = getLocalMatches();
    return localMatches;
  } catch (error) {
    console.log('Error fetching from API, using local storage:', error);
    const localMatches = getLocalMatches();
    return localMatches;
  }
};

export const addMatch = async (match: Match): Promise<Match> => {
  const newMatch = { ...match, id: Date.now().toString() };
  const localMatches = getLocalMatches();
  
  try {
    // Пытаемся сохранить в API
    const response = await fetch(`${API_URL}/api/matches`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(newMatch),
    });
    
    if (response.ok) {
      const savedMatch = await response.json();
      // Обновляем локальное хранилище данными из API
      localMatches.push(savedMatch);
      saveLocalMatches(localMatches);
      return savedMatch;
    }
  } catch (error) {
    console.log('Error adding to API, using local storage:', error);
  }
  
  // Если API недоступен, сохраняем только в локальное хранилище
  localMatches.push(newMatch);
  saveLocalMatches(localMatches);
  return newMatch;
};

export const updateMatch = async (match: Match): Promise<Match> => {
  const localMatches = getLocalMatches();
  
  try {
    // Пытаемся обновить в API
    const response = await fetch(`${API_URL}/api/matches/${match.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(match),
    });
    
    if (response.ok) {
      const updatedMatch = await response.json();
      // Обновляем локальное хранилище данными из API
      const index = localMatches.findIndex(m => m.id === match.id);
      if (index !== -1) {
        localMatches[index] = updatedMatch;
        saveLocalMatches(localMatches);
      }
      return updatedMatch;
    }
  } catch (error) {
    console.log('Error updating in API, using local storage:', error);
  }
  
  // Если API недоступен, обновляем только в локальном хранилище
  const index = localMatches.findIndex(m => m.id === match.id);
  if (index !== -1) {
    localMatches[index] = match;
    saveLocalMatches(localMatches);
  }
  return match;
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  const localMatches = getLocalMatches();
  
  try {
    // Пытаемся удалить из API
    const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (response.ok) {
      // Удаляем из локального хранилища
      const filteredMatches = localMatches.filter(m => m.id !== matchId);
      saveLocalMatches(filteredMatches);
      return;
    }
  } catch (error) {
    console.log('Error deleting from API, using local storage:', error);
  }
  
  // Если API недоступен, удаляем только из локального хранилища
  const filteredMatches = localMatches.filter(m => m.id !== matchId);
  saveLocalMatches(filteredMatches);
}; 