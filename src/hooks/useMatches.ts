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
      try {
        // Try to fetch matches from API first
        const apiMatches = await fetchMatches();
        if (apiMatches.length > 0) {
          setMatches(apiMatches);
          // Update localStorage as backup
          localStorage.setItem(STORAGE_KEY, JSON.stringify(apiMatches));
        } else {
          // If API returns empty, try to load from localStorage
          const storedMatches = localStorage.getItem(STORAGE_KEY);
          if (storedMatches) {
            setMatches(JSON.parse(storedMatches));
          }
        }
      } catch (error) {
        console.error('Error loading matches:', error);
        // If API fails, try to load from localStorage
        try {
          const storedMatches = localStorage.getItem(STORAGE_KEY);
          if (storedMatches) {
            setMatches(JSON.parse(storedMatches));
          }
        } catch (e) {
          console.error('Error loading matches from localStorage:', e);
          setError('Failed to load matches');
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
          setMatches(newMatches);
        } catch (error) {
          console.error('Error parsing matches from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveMatches = async (newMatches: Match[]) => {
    try {
      // Try to save to API first
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
    } catch (error) {
      console.error('Error saving matches:', error);
      // If API fails, save to localStorage only
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
        setMatches(newMatches);
      } catch (e) {
        console.error('Error saving matches to localStorage:', e);
        throw e;
      }
    }
  };

  const addMatch = async (match: Match) => {
    try {
      const savedMatch = await apiAddMatch(match);
      const newMatches = [...matches, savedMatch];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    } catch (error) {
      console.error('Error adding match:', error);
      // If API fails, save to localStorage only
      const newMatches = [...matches, match];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    }
  };

  const updateMatch = async (updatedMatch: Match) => {
    try {
      const savedMatch = await apiUpdateMatch(updatedMatch);
      const newMatches = matches.map(match => 
        match.id === savedMatch.id ? savedMatch : match
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    } catch (error) {
      console.error('Error updating match:', error);
      // If API fails, update localStorage only
      const newMatches = matches.map(match => 
        match.id === updatedMatch.id ? updatedMatch : match
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    }
  };

  const deleteMatch = async (matchId: string) => {
    try {
      await apiDeleteMatch(matchId);
      const newMatches = matches.filter(match => match.id !== matchId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    } catch (error) {
      console.error('Error deleting match:', error);
      // If API fails, update localStorage only
      const newMatches = matches.filter(match => match.id !== matchId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    }
  };

  return {
    matches,
    isLoading,
    error,
    addMatch,
    updateMatch,
    deleteMatch,
  };
}; 