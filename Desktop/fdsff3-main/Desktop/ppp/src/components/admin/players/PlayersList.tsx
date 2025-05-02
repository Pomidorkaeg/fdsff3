
import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Player } from '@/types/player';

interface PlayersListProps {
  players: Player[];
  searchTerm: string;
  primaryColor: string;
  onEdit: (player: Player) => void;
  onDelete: (playerId: string) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({ 
  players, 
  searchTerm, 
  primaryColor, 
  onEdit, 
  onDelete 
}) => {
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              №
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Игрок
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Позиция
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Характеристики
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Статистика
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPlayers.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white font-medium text-sm"
                  style={{ backgroundColor: primaryColor || '#2e7d32' }}
                >
                  {player.number}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full object-cover" src={player.image} alt={player.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.nationality}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {player.position}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {player.height} см, {player.weight} кг
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">{player.matches} матчей</span>
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">{player.goals} голов</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEdit(player)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDelete(player.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
          
          {filteredPlayers.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                Игроки не найдены. Добавьте первого игрока!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
