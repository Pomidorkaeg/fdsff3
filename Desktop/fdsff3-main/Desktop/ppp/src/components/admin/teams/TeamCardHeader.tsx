
import React from 'react';
import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Team } from '@/types/team';

interface TeamCardHeaderProps {
  team: Team;
  onEdit: (team: Team) => void;
}

const TeamCardHeader: React.FC<TeamCardHeaderProps> = ({ team, onEdit }) => {
  return (
    <div className="h-48 relative">
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url('${team.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to right, ${team.primaryColor}DD, ${team.secondaryColor}99)`,
        }}
      ></div>
      <div className="absolute inset-0 p-6 flex items-center">
        <div className="flex items-center">
          <img 
            src={team.logo} 
            alt={team.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="ml-6">
            <h3 className="text-3xl font-bold text-white drop-shadow-md">
              {team.name}
            </h3>
            <p className="text-white text-opacity-90">
              Основан в {team.foundedYear} году
            </p>
          </div>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => onEdit(team)}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <Edit2 className="h-4 w-4 mr-1" /> Изменить
        </Button>
      </div>
    </div>
  );
};

export default TeamCardHeader;
