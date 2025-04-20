import { useState, useEffect } from 'react';
import { Match } from '../types/match';
import { fetchMatches } from '../utils/api/matches';

const STORAGE_KEY = 'fc_matches';

const getLocalMatches = (): Match[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const saveLocalMatches = (matches: Match[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatches();
        setMatches(data);
        setError(null);
      } catch (err) {
        console.error('Error loading matches:', err);
        setError('Ошибка при загрузке матчей');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  return { matches, loading, error };
}; 