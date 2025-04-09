
import React from 'react';
import { cn } from '@/lib/utils';
import { Player } from '@/types/player';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  primaryColor: string;
  onSelect: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  isSelected, 
  primaryColor, 
  onSelect 
}) => {
  return (
    <div
      onClick={() => onSelect(player)}
      className={cn(
        "relative bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1",
        isSelected 
          ? `border-[${primaryColor}] ring-2 ring-[${primaryColor}]/20` 
          : `border-gray-200 hover:border-[${primaryColor}]/50`
      )}
      style={{ 
        borderColor: isSelected ? primaryColor : '',
        boxShadow: isSelected ? `0 0 0 2px ${primaryColor}20` : ''
      }}
    >
      <div className="flex">
        <div className="w-1/3 relative">
          <img 
            src={player.image} 
            alt={player.name} 
            className="w-full h-full object-cover aspect-[3/4]"
          />
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{ background: `linear-gradient(to right, ${primaryColor}80, transparent)` }}
          ></div>
          <div 
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {player.number}
          </div>
        </div>
        
        <div className="w-2/3 p-4">
          <div className="flex flex-col h-full">
            <div>
              <div 
                className="text-xs font-medium mb-1"
                style={{ color: primaryColor }}
              >
                {player.position}
              </div>
              <h3 className="text-lg font-bold mb-3">{player.name}</h3>
            </div>
            
            <div className="mt-auto grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Матчи</div>
                <div className="font-bold">{player.matches}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Голы</div>
                <div className="font-bold">{player.goals}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Передачи</div>
                <div className="font-bold">{player.assists}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
