import React, { useState } from 'react';
import { Player } from '@/types/player';
import { getAssetUrl } from '@/utils/assetUtils';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  onClick?: (player: Player) => void;
  primaryColor?: string;
  small?: boolean;
}

const PlayerCard = ({ player, onClick, primaryColor = '#2E7D32', small = false }: PlayerCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer",
        small ? "h-[280px]" : "h-[360px]"
      )}
      onClick={() => onClick?.(player)}
    >
      <div className={cn(
        "relative w-full overflow-hidden",
        small ? "h-[200px]" : "h-[280px]"
      )}>
        <img
          src={imageError ? getAssetUrl('placeholder.svg') : getAssetUrl(player.image)}
          alt={player.name}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to top, ${primaryColor}cc, transparent)` 
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight mb-1">{player.name}</h3>
            <p className="text-sm text-white/80">{player.position}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold">{player.number}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
