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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Сначала пытаемся получить данные из API
        const apiMatches = await fetchMatches();
        
        // Если API вернул матчи, используем их
        if (apiMatches && apiMatches.length > 0) {
          setMatches(apiMatches);
          saveLocalMatches(apiMatches);
        } else {
          // Если API вернул пустой список, проверяем локальное хранилище
          const localMatches = getLocalMatches();
          if (localMatches && localMatches.length > 0) {
            setMatches(localMatches);
          }
        }
      } catch (err) {
        console.error('Error loading matches:', err);
        setError('Не удалось загрузить матчи. Пожалуйста, попробуйте позже.');
        // В случае ошибки проверяем локальное хранилище
        const localMatches = getLocalMatches();
        if (localMatches && localMatches.length > 0) {
          setMatches(localMatches);
        }
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
      saveLocalMatches([...matches, newMatch]);
    } catch (err) {
      console.error('Error adding match:', err);
      setError('Не удалось добавить матч. Пожалуйста, попробуйте позже.');
    }
  };

  const handleUpdateMatch = async (updatedMatch: Match) => {
    try {
      const match = await updateMatch(updatedMatch);
      setMatches(prev => prev.map(m => m.id === match.id ? match : m));
      saveLocalMatches(matches.map(m => m.id === match.id ? match : m));
    } catch (err) {
      console.error('Error updating match:', err);
      setError('Не удалось обновить матч. Пожалуйста, попробуйте позже.');
    }
  };

  const handleDeleteMatch = async (matchId: string) => {
    try {
      await deleteMatch(matchId);
      setMatches(prev => prev.filter(m => m.id !== matchId));
      saveLocalMatches(matches.filter(m => m.id !== matchId));
    } catch (err) {
      console.error('Error deleting match:', err);
      setError('Не удалось удалить матч. Пожалуйста, попробуйте позже.');
    }
  };

  return {
    matches,
    setMatches,
    isLoading,
    error,
    addMatch: handleAddMatch,
    updateMatch: handleUpdateMatch,
    deleteMatch: handleDeleteMatch
  };
}; 