import { Match } from '@/hooks/useMatches';

// Используем production URL для API
const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    console.log('Fetching matches from API...');
    const response = await fetch(`${API_URL}/api/matches`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch matches:', errorText);
      throw new Error(`Failed to fetch matches: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    console.log('Successfully fetched matches:', data);
    return data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export const addMatch = async (match: Match): Promise<Match> => {
  try {
    console.log('Adding match to API:', match);
    const response = await fetch(`${API_URL}/api/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to add match:', errorText);
      throw new Error(`Failed to add match: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    console.log('Successfully added match:', data);
    return data;
  } catch (error) {
    console.error('Error adding match:', error);
    throw error;
  }
};

export const updateMatch = async (match: Match): Promise<Match> => {
  try {
    console.log('Updating match in API:', match);
    const response = await fetch(`${API_URL}/api/matches/${match.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to update match:', errorText);
      throw new Error(`Failed to update match: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    console.log('Successfully updated match:', data);
    return data;
  } catch (error) {
    console.error('Error updating match:', error);
    throw error;
  }
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  try {
    console.log('Deleting match from API:', matchId);
    const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to delete match:', errorText);
      throw new Error(`Failed to delete match: ${response.status} ${errorText}`);
    }
    console.log('Successfully deleted match:', matchId);
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
}; 