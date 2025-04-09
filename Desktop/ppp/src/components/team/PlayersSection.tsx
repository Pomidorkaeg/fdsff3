
import React from 'react';
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
  // Filter players by position
  const filteredPlayers = activePosition === 'all'
    ? players
    : players.filter(player => player.position === activePosition);

  // Group players by position (for display)
  const positionGroups = {
    'Вратарь': players.filter(p => p.position === 'Вратарь'),
    'Защитник': players.filter(p => p.position === 'Защитник'),
    'Полузащитник': players.filter(p => p.position === 'Полузащитник'),
    'Нападающий': players.filter(p => p.position === 'Нападающий')
  };

  // Calculate age from birth date
  const calculateAge = (birthDate: string) => {
    const [day, month, year] = birthDate.split('.').map(Number);
    const birthDateObj = new Date(year, month - 1, day);
    const ageDifMs = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Example players based on screenshot
  const examplePlayers = [
    {
      id: '1',
      name: 'Егор Морозов',
      number: 1,
      position: 'Вратарь',
      birthDate: '01.01.2000',
      height: 190,
      nationality: 'Россия',
      matches: 15,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      weight: 85,
      image: '/lovable-uploads/b0c5852e-2b08-4685-975e-86200bd03993.png'
    },
    {
      id: '2',
      name: 'Кирилл Попов',
      number: 3,
      position: 'Защитник',
      birthDate: '15.05.1998',
      height: 185,
      nationality: 'Россия',
      matches: 18,
      goals: 0,
      assists: 1,
      yellowCards: 2,
      redCards: 0,
      weight: 82,
      image: '/lovable-uploads/e63ae827-3983-48cc-a62e-9ca8f59c19c1.png'
    },
    {
      id: '3',
      name: 'Максим Лебедев',
      number: 10,
      position: 'Полузащитник',
      birthDate: '23.07.1999',
      height: 178,
      nationality: 'Россия',
      matches: 20,
      goals: 5,
      assists: 8,
      yellowCards: 3,
      redCards: 0,
      weight: 75,
      image: '/lovable-uploads/32f3adbf-c114-4522-acd9-b7ce55ae7ebc.png'
    }
  ];

  return (
    <div>
      <PositionFilter
        activePosition={activePosition}
        onPositionChange={onPositionChange}
        primaryColor={primaryColor}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {examplePlayers.map(player => (
          <div key={player.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1">
              <div className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="mb-2">
                  <div className="text-sm text-gray-500">{player.position}</div>
                  <h3 className="text-lg font-bold">{player.name}</h3>
                  <div className="text-sm text-gray-600">Возраст: {calculateAge(player.birthDate)} лет</div>
                  <div className="text-sm text-gray-600">Дата рождения: {player.birthDate}</div>
                  <div className="text-sm text-gray-600">Рост: {player.height} см</div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-gray-500">Матчи</div>
                    <div className="font-bold">{player.matches}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Голы</div>
                    <div className="font-bold">{player.goals}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Передачи</div>
                    <div className="font-bold">{player.assists}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
