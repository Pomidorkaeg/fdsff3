
import React, { useMemo } from 'react';
import { Player } from '@/types/player';
import PlayerCard from '@/components/players/PlayerCard';
import PlayerDetail from '@/components/players/PlayerDetail';
import PositionFilter from '@/components/players/PositionFilter';

interface PlayersSectionProps {
  players: Player[];
  activePosition: string;
  selectedPlayer: Player | null;
  primaryColor: string;
  secondaryColor: string;
  onPositionChange: (position: string) => void;
  onPlayerSelect: (player: Player) => void;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({
  players,
  activePosition,
  selectedPlayer,
  primaryColor,
  secondaryColor,
  onPositionChange,
  onPlayerSelect
}) => {
  // Filter players by position with useMemo for better performance
  const filteredPlayers = useMemo(() => {
    return activePosition === 'all'
      ? players
      : players.filter(player => player.position === activePosition);
  }, [players, activePosition]);

  return (
    <div>
      <PositionFilter
        activePosition={activePosition}
        onPositionChange={onPositionChange}
        primaryColor={primaryColor}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayer?.id === player.id}
              primaryColor={primaryColor}
              onSelect={onPlayerSelect}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            Игроки не найдены для выбранной позиции
          </div>
        )}
      </div>

      {selectedPlayer && (
        <PlayerDetail
          player={selectedPlayer}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
    </div>
  );
};

export default PlayersSection;
