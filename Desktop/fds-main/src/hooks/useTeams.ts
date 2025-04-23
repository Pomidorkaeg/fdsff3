import { useState, useEffect } from 'react';
import { Team } from '../types/team';
import { fetchTeams } from '../utils/api/teams';

const STORAGE_KEY = 'fc_teams';

const getLocalTeams = (): Team[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalTeams = (teams: Team[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
};

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const data = await fetchTeams();
        setTeams(data);
        saveLocalTeams(data); // Cache the data
        setError(null);
      } catch (err) {
        console.error('Error loading teams from API:', err);
        // If API fails, try to load from local storage
        const localTeams = getLocalTeams();
        if (localTeams.length > 0) {
          setTeams(localTeams);
          setError('Используются сохраненные данные (API недоступен)');
        } else {
          setError('Ошибка при загрузке команд');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return { teams, loading, error };
}; 