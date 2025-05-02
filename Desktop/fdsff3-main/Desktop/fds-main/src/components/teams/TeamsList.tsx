import React from 'react';
import { useTeams } from '../../hooks/useTeams';
import { Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Team } from '../../types/team';

const TeamsList: React.FC = () => {
  const { teams, loading, error } = useTeams();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Нет доступных команд</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team: Team) => (
        <div
          key={team.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            {team.logo && (
              <div className="flex items-center justify-center mb-4">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="h-24 w-24 object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold text-center mb-2">{team.name}</h3>
            <div className="space-y-2">
              {team.coach && (
                <p><span className="font-medium">Тренер:</span> {team.coach}</p>
              )}
              <p><span className="font-medium">Год основания:</span> {team.founded}</p>
              <p><span className="font-medium">Стадион:</span> {team.stadium}</p>
              <p><span className="font-medium">Город:</span> {team.city}</p>
            </div>
            {team.stats && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Статистика сезона:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <p>Матчи: {team.stats.matchesPlayed}</p>
                  <p>Победы: {team.stats.wins}</p>
                  <p>Ничьи: {team.stats.draws}</p>
                  <p>Поражения: {team.stats.losses}</p>
                  <p>Забито: {team.stats.goalsFor}</p>
                  <p>Пропущено: {team.stats.goalsAgainst}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamsList; 