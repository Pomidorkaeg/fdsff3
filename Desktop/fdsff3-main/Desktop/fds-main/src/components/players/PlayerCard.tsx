import React, { useState } from 'react';
import { Player } from '@/types/player';
import { getAssetUrl } from '@/utils/assetUtils';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface PlayerCardProps {
  player: Player;
  onEdit: () => void;
  onDelete: () => void;
}

export function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const getPositionColor = (position: Player['position']) => {
    switch (position) {
      case 'goalkeeper':
        return 'bg-blue-500';
      case 'defender':
        return 'bg-green-500';
      case 'midfielder':
        return 'bg-yellow-500';
      case 'forward':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage 
            src={imageError ? getAssetUrl('placeholder.svg') : getAssetUrl(player.image)} 
            alt={`${player.firstName} ${player.lastName}`} 
            onError={handleImageError}
          />
          <AvatarFallback>{getInitials(player.firstName, player.lastName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">
            {player.firstName} {player.lastName}
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {player.number && (
              <Badge variant="secondary">#{player.number}</Badge>
            )}
            <Badge className={getPositionColor(player.position)}>
              {player.position}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Национальность</p>
            <p>{player.nationality}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Дата рождения</p>
            <p>{new Date(player.dateOfBirth).toLocaleDateString()}</p>
          </div>
          {player.height && (
            <div>
              <p className="text-sm text-muted-foreground">Рост</p>
              <p>{player.height} см</p>
            </div>
          )}
          {player.weight && (
            <div>
              <p className="text-sm text-muted-foreground">Вес</p>
              <p>{player.weight} кг</p>
            </div>
          )}
        </div>
        {player.stats && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Статистика</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Игры</p>
                <p className="font-medium">{player.stats.appearances}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Голы</p>
                <p className="font-medium">{player.stats.goals}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Передачи</p>
                <p className="font-medium">{player.stats.assists}</p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Редактировать
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
