import React, { useState } from 'react';
import { useSite } from '@/lib/site-context';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PlayersSection: React.FC = () => {
  const { data, isLoading, error, refreshData } = useSite();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const players = data?.players || [];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      toast.success('Данные обновлены');
    } catch (err) {
      toast.error('Ошибка при обновлении данных');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-fc-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Нет игроков</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            {player.image && (
              <img
                src={player.image}
                alt={`${player.firstName} ${player.lastName}`}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                {player.firstName} {player.lastName}
              </h3>
              <p className="text-gray-600 mb-2">
                Номер: {player.number || 'Не указан'}
              </p>
              <p className="text-gray-600 mb-2">
                Позиция: {player.position}
              </p>
              <p className="text-gray-600">
                Команда: {player.team}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayersSection; 