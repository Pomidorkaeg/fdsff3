import { useState, useEffect } from 'react';
import { Player } from '@/types/player';
import { fetchPlayers, addPlayer, updatePlayer, deletePlayer } from '@/utils/api/players';
import { toast } from 'sonner';

const STORAGE_KEY = 'fc_players';

const getLocalPlayers = (): Player[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalPlayers = (players: Player[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPlayers();
      setPlayers(data);
      saveLocalPlayers(data);
    } catch (err) {
      console.error('Error loading players:', err);
      setError('Ошибка при загрузке игроков');
      // Fallback to local storage if API fails
      const localPlayers = getLocalPlayers();
      if (localPlayers.length > 0) {
        setPlayers(localPlayers);
        toast.warning('Используются локальные данные');
      }
    } finally {
      setLoading(false);
    }
  };

  const createPlayer = async (player: Omit<Player, 'id'>) => {
    try {
      const newPlayer = await addPlayer(player);
      setPlayers(prev => [...prev, newPlayer]);
      saveLocalPlayers([...players, newPlayer]);
      toast.success('Игрок успешно добавлен');
      return newPlayer;
    } catch (err) {
      console.error('Error creating player:', err);
      toast.error('Не удалось добавить игрока');
      throw err;
    }
  };

  const editPlayer = async (id: string, player: Partial<Player>) => {
    try {
      const updatedPlayer = await updatePlayer(id, player);
      setPlayers(prev => prev.map(p => p.id === id ? updatedPlayer : p));
      saveLocalPlayers(players.map(p => p.id === id ? updatedPlayer : p));
      toast.success('Игрок успешно обновлен');
      return updatedPlayer;
    } catch (err) {
      console.error('Error updating player:', err);
      toast.error('Не удалось обновить игрока');
      throw err;
    }
  };

  const removePlayer = async (id: string) => {
    try {
      await deletePlayer(id);
      setPlayers(prev => prev.filter(p => p.id !== id));
      saveLocalPlayers(players.filter(p => p.id !== id));
      toast.success('Игрок успешно удален');
    } catch (err) {
      console.error('Error deleting player:', err);
      toast.error('Не удалось удалить игрока');
      throw err;
    }
  };

  return {
    players,
    loading,
    error,
    createPlayer,
    editPlayer,
    removePlayer,
    refreshPlayers: loadPlayers
  };
} 