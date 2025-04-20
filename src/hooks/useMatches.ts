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
    let mounted = true;

    const loadMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        const data = await fetchMatches();
        if (mounted) {
          setMatches(data);
          saveLocalMatches(data);
        }
      } catch (err) {
        console.error('Error loading matches from API:', err);
        if (mounted) {
          // If API fails, try to load from local storage
          const localMatches = getLocalMatches();
          if (localMatches.length > 0) {
            setMatches(localMatches);
            setError('Используются сохраненные данные (API недоступен)');
          } else {
            setError('Ошибка при загрузке матчей');
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMatches();

    return () => {
      mounted = false;
    };
  }, []);

  return { matches, loading, error };
}; 