import { useState, useEffect } from 'react';
import { fetchMatches, addMatch, updateMatch, deleteMatch, getLocalMatches, saveLocalMatches } from '@/utils/api/matches';

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

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMatches();
        setMatches(data);
        setError('');
      } catch (err) {
        console.error('Error loading matches:', err);
        setError('Используются сохраненные данные. API недоступен.');
        const localMatches = getLocalMatches();
        setMatches(localMatches);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, []);

  const handleAddMatch = async (match: Match) => {
    try {
      const newMatch = await addMatch(match);
      setMatches(prev => [...prev, newMatch]);
    } catch (err) {
      console.error('Error adding match:', err);
      throw err;
    }
  };

  const handleUpdateMatch = async (updatedMatch: Match) => {
    try {
      const match = await updateMatch(updatedMatch);
      setMatches(prev => prev.map(m => m.id === match.id ? match : m));
    } catch (err) {
      console.error('Error updating match:', err);
      throw err;
    }
  };

  const handleDeleteMatch = async (matchId: string) => {
    try {
      await deleteMatch(matchId);
      setMatches(prev => prev.filter(m => m.id !== matchId));
    } catch (err) {
      console.error('Error deleting match:', err);
      throw err;
    }
  };

  const handleSaveMatches = async (newMatches: Match[]) => {
    try {
      saveLocalMatches(newMatches);
      setMatches(newMatches);
    } catch (err) {
      console.error('Error saving matches:', err);
      throw err;
    }
  };

  return {
    matches,
    setMatches,
    isLoading,
    error,
    addMatch: handleAddMatch,
    updateMatch: handleUpdateMatch,
    deleteMatch: handleDeleteMatch,
    saveMatches: handleSaveMatches
  };
}; 