import { useState, useEffect } from 'react';
import { Team } from '../types/team';
import { fetchTeams } from '../utils/api/teams';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchTeams();
        setTeams(data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке команд');
        console.error('Error loading teams:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return { teams, loading, error };
}; 