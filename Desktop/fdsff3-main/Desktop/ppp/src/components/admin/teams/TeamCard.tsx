
import React from 'react';
import { Card } from '@/components/ui/card';
import { Team } from '@/types/team';
import TeamCardHeader from './TeamCardHeader';
import TeamCardContent from './TeamCardContent';

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onEdit }) => {
  return (
    <Card key={team.id} className="overflow-hidden">
      <TeamCardHeader team={team} onEdit={onEdit} />
      <TeamCardContent team={team} />
    </Card>
  );
};

export default TeamCard;
