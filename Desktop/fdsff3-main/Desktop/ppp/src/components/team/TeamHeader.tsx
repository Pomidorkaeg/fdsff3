
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Team } from '@/types/team';

interface TeamHeaderProps {
  teams: Team[];
  activeTeam: string;
  onTeamChange: (teamId: string) => void;
  primaryColor: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ 
  teams, 
  activeTeam, 
  onTeamChange,
  primaryColor
}) => {
  return (
    <div className="relative text-white py-10" style={{ 
      backgroundColor: primaryColor,
      background: `linear-gradient(135deg, ${primaryColor}, ${teams.find(t => t.id === activeTeam)?.secondaryColor || '#ffeb3b'})`
    }}>
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          opacity: 0.3
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Shield className="w-8 h-8" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Наши команды</h1>
          
          {/* Team Selector */}
          <div className="mt-6 mb-8">
            <div className="inline-flex p-1 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
              {teams.map(team => (
                <button
                  key={team.id}
                  onClick={() => onTeamChange(team.id)}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                    activeTeam === team.id 
                      ? `bg-white text-[${team.primaryColor}] shadow-md` 
                      : "text-white hover:bg-white/20"
                  )}
                  style={{ color: activeTeam === team.id ? team.primaryColor : '' }}
                >
                  {team.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
