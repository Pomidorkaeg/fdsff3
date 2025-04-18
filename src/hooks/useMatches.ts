import { useState, useEffect } from 'react';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'live' | 'finished';
  score?: {
    home: number;
    away: number;
  };
}

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load matches from localStorage
  useEffect(() => {
    const loadMatches = () => {
      try {
        const storedMatches = localStorage.getItem('matches');
        if (storedMatches) {
          const parsedMatches = JSON.parse(storedMatches);
          if (Array.isArray(parsedMatches)) {
            setMatches(parsedMatches);
          }
        }
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'matches') {
        loadMatches();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveMatches = (newMatches: Match[]) => {
    try {
      localStorage.setItem('matches', JSON.stringify(newMatches));
      setMatches(newMatches);
      // Trigger storage event for other tabs/windows
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error('Error saving matches:', error);
      return false;
    }
  };

  const addMatch = (match: Omit<Match, 'id'>) => {
    const newMatch: Match = {
      ...match,
      id: Date.now().toString(),
    };
    const updatedMatches = [...matches, newMatch];
    return saveMatches(updatedMatches);
  };

  const updateMatch = (match: Match) => {
    const updatedMatches = matches.map(m => m.id === match.id ? match : m);
    return saveMatches(updatedMatches);
  };

  const deleteMatch = (id: string) => {
    const updatedMatches = matches.filter(m => m.id !== id);
    return saveMatches(updatedMatches);
  };

  return {
    matches,
    isLoading,
    addMatch,
    updateMatch,
    deleteMatch,
  };
}; 