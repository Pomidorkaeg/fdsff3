import { useState, useEffect } from 'react';
import { Match } from '../types/match';
import { fetchMatches } from '../utils/api/matches';

const STORAGE_KEY = 'fc_matches';

const getLocalMatches = (): Match[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalMatches = (matches: Match[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
};

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const data = await fetchMatches();
        setMatches(data);
        saveLocalMatches(data); // Cache the data
        setError(null);
      } catch (err) {
        console.error('Error loading matches from API:', err);
        // If API fails, try to load from local storage
        const localMatches = getLocalMatches();
        if (localMatches.length > 0) {
          setMatches(localMatches);
          setError('Используются сохраненные данные (API недоступен)');
        } else {
          setError('Ошибка при загрузке матчей');
        }
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  return { matches, loading, error };
}; 