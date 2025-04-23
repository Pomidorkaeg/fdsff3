import { Player } from '@/types/player';
import { PlayerCard } from './PlayerCard';
import { usePlayers } from '@/hooks/usePlayers';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const PlayersList = () => {
  const { players, loading, error } = usePlayers();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!players || players.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Нет данных</AlertTitle>
        <AlertDescription>Список игроков пуст</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {players.map((player) => (
        <PlayerCard 
          key={player.id} 
          player={player}
          onEdit={() => {/* TODO: Implement edit handler */}}
          onDelete={() => {/* TODO: Implement delete handler */}}
        />
      ))}
    </div>
  );
}; 