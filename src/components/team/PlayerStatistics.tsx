import React from 'react';
import { Player } from '@/types/player';

interface PlayerStatisticsProps {
  players: Player[];
  primaryColor: string;
}

interface StatRow {
  name: string;
  matches: number;
  minutes: number;
  goals: number;
  yellowCards: number;
  redCards: number;
}

const PlayerStatistics: React.FC<PlayerStatisticsProps> = ({ players, primaryColor }) => {
  const sortedPlayers = [...players].sort((a, b) => b.goals - a.goals || b.matches - a.matches);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold" style={{ color: primaryColor }}>Статистика игроков</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="py-3 px-4 text-left font-medium">Игрок</th>
              <th className="py-3 px-4 text-center font-medium">Матчи</th>
              <th className="py-3 px-4 text-center font-medium">Голы</th>
              <th className="py-3 px-4 text-center font-medium w-20">ЖК</th>
              <th className="py-3 px-4 text-center font-medium w-20">КК</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr key={player.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full mr-3 overflow-hidden">
                      <img 
                        src={player.image} 
                        alt={player.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.position}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{player.matches}</td>
                <td className="py-3 px-4 text-center font-medium" style={{ color: primaryColor }}>
                  {player.goals}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {player.yellowCards}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    {player.redCards}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerStatistics;