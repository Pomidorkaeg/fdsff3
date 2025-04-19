import { useState, useEffect } from 'react';

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

  useEffect(() => {
    try {
      const storedMatches = localStorage.getItem(STORAGE_KEY);
      if (storedMatches) {
        setMatches(JSON.parse(storedMatches));
      }
    } catch (error) {
      console.error('Error loading matches from localStorage:', error);
    } finally {
      setIsLoading(false);
    }

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

  const saveMatches = (newMatches: Match[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
    } catch (error) {
      console.error('Error saving matches to localStorage:', error);
      throw error;
    }
  };

  const addMatch = (match: Match) => {
    const newMatches = [...matches, match];
    saveMatches(newMatches);
  };

  const updateMatch = (updatedMatch: Match) => {
    const newMatches = matches.map(match => 
      match.id === updatedMatch.id ? updatedMatch : match
    );
    saveMatches(newMatches);
  };

  const deleteMatch = (matchId: string) => {
    const newMatches = matches.filter(match => match.id !== matchId);
    saveMatches(newMatches);
  };

  return {
    matches,
    isLoading,
    addMatch,
    updateMatch,
    deleteMatch,
  };
}; 