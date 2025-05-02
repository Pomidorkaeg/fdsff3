import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Trophy } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';

interface MatchesSectionProps {
  teamId: string;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({ teamId }) => {
  const { matches } = useMatches();
  
  // Filter matches for the current team
  const teamMatches = matches.filter(match => 
    match.homeTeam === teamId || match.awayTeam === teamId
  );

  return (
    <div className="space-y-4">
      {teamMatches.length === 0 ? (
        <p className="text-center text-gray-500">Нет запланированных матчей</p>
      ) : (
        teamMatches.map(match => (
          <Card key={match.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="font-medium">{match.homeTeam}</span>
                  <span className="text-sm text-gray-500">vs</span>
                  <span className="font-medium">{match.awayTeam}</span>
                </div>
                {match.score && (
                  <div className="text-xl font-bold">
                    {match.score.home} - {match.score.away}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {match.date} {match.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Trophy className="w-4 h-4 mr-1" />
                  {match.competition}
                </div>
                <div className="text-sm text-gray-500">
                  {match.venue}
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default MatchesSection; 