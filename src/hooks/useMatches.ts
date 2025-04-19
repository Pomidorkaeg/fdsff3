import { useState, useEffect } from 'react';
import { fetchMatches, addMatch as apiAddMatch, updateMatch as apiUpdateMatch, deleteMatch as apiDeleteMatch } from '@/utils/api/matches';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: MatchStatus;
  score?: {
    home: number;
    away: number;
  };
}

const STORAGE_KEY = 'matches';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      console.log('Loading matches...');
      try {
        // Always try to fetch matches from API first
        const apiMatches = await fetchMatches();
        console.log('API matches:', apiMatches);
        
        if (apiMatches && apiMatches.length > 0) {
          // If API returns matches, use them and update localStorage
          setMatches(apiMatches);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(apiMatches));
          setError(null);
          console.log('Matches loaded from API and saved to localStorage');
        } else {
          // If API returns empty, try to load from localStorage
          const storedMatches = localStorage.getItem(STORAGE_KEY);
          console.log('Stored matches from localStorage:', storedMatches);
          
          if (storedMatches) {
            const parsedMatches = JSON.parse(storedMatches);
            if (parsedMatches && parsedMatches.length > 0) {
              setMatches(parsedMatches);
              setError('Используются сохраненные данные. API недоступен.');
              console.log('Matches loaded from localStorage');
            } else {
              setMatches([]);
              setError('Нет доступных матчей');
              console.log('No matches found in localStorage');
            }
          } else {
            setMatches([]);
            setError('Нет доступных матчей');
            console.log('No matches found in localStorage');
          }
        }
      } catch (error) {
        console.error('Error loading matches:', error);
        // If API fails, try to load from localStorage
        try {
          const storedMatches = localStorage.getItem(STORAGE_KEY);
          console.log('Stored matches from localStorage after API error:', storedMatches);
          
          if (storedMatches) {
            const parsedMatches = JSON.parse(storedMatches);
            if (parsedMatches && parsedMatches.length > 0) {
              setMatches(parsedMatches);
              setError('Используются сохраненные данные. API недоступен.');
              console.log('Matches loaded from localStorage after API error');
            } else {
              setMatches([]);
              setError('Нет доступных матчей');
              console.log('No matches found in localStorage after API error');
            }
          } else {
            setMatches([]);
            setError('Нет доступных матчей');
            console.log('No matches found in localStorage after API error');
          }
        } catch (e) {
          console.error('Error loading matches from localStorage:', e);
          setMatches([]);
          setError('Ошибка загрузки матчей');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newMatches = e.newValue ? JSON.parse(e.newValue) : [];
          console.log('Storage event - new matches:', newMatches);
          setMatches(newMatches);
        } catch (error) {
          console.error('Error parsing matches from storage event:', error);
          setMatches([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveMatches = async (newMatches: Match[]) => {
    console.log('Saving matches:', newMatches);
    try {
      // Always try to save to API first
      for (const match of newMatches) {
        if (!matches.find(m => m.id === match.id)) {
          await apiAddMatch(match);
        } else {
          await apiUpdateMatch(match);
        }
      }
      // Update localStorage as backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      setError(null);
      console.log('Matches saved to API and localStorage');
    } catch (error) {
      console.error('Error saving matches:', error);
      setError('Ошибка сохранения матчей');
    }
  };

  const addMatch = async (match: Match) => {
    console.log('Adding match:', match);
    try {
      const savedMatch = await apiAddMatch(match);
      const newMatches = [...matches, savedMatch];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      setError(null);
      console.log('Match added to API and localStorage');
    } catch (error) {
      console.error('Error adding match:', error);
      setError('Ошибка добавления матча');
      throw error;
    }
  };

  const updateMatch = async (updatedMatch: Match) => {
    console.log('Updating match:', updatedMatch);
    try {
      const savedMatch = await apiUpdateMatch(updatedMatch);
      const newMatches = matches.map(match => 
        match.id === savedMatch.id ? savedMatch : match
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      setError(null);
      console.log('Match updated in API and localStorage');
    } catch (error) {
      console.error('Error updating match:', error);
      setError('Ошибка обновления матча');
      throw error;
    }
  };

  const deleteMatch = async (matchId: string) => {
    console.log('Deleting match:', matchId);
    try {
      await apiDeleteMatch(matchId);
      const newMatches = matches.filter(match => match.id !== matchId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      setError(null);
      console.log('Match deleted from API and localStorage');
    } catch (error) {
      console.error('Error deleting match:', error);
      setError('Ошибка удаления матча');
      throw error;
    }
  };

  return {
    matches,
    isLoading,
    error,
    addMatch,
    updateMatch,
    deleteMatch,
    saveMatches
  };
}; 