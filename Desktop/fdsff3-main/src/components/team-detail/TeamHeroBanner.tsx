import React from 'react';
import { Team } from '@/types/team';
import { getAssetUrl } from '@/utils/assetUtils';

interface TeamHeroBannerProps {
  team: Team;
}

const TeamHeroBanner: React.FC<TeamHeroBannerProps> = ({ team }) => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getAssetUrl(team.backgroundImage)})`,
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(to right, ${team.primaryColor}cc, ${team.secondaryColor}cc)` 
          }} 
        />
      </div>
      
      <div className="relative container mx-auto h-full px-4 py-8 flex items-center">
        <div className="flex items-center gap-8">
          <img
            src={getAssetUrl(team.logo)}
            alt={team.name}
            className="w-32 h-32 object-contain filter drop-shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{team.name}</h1>
            <p className="text-white/80 text-lg">{team.foundedYear} год основания</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeroBanner;
