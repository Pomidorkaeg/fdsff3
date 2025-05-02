
import React from 'react';
import { Team } from '@/types/team';
import TeamHeroBanner from './team-detail/TeamHeroBanner';
import TeamPhotoSection from './team-detail/TeamPhotoSection';
import TeamDescription from './team-detail/TeamDescription';
import TeamAchievements from './team-detail/TeamAchievements';
import TeamInfoCard from './team-detail/TeamInfoCard';
import SocialLinks from './team-detail/SocialLinks';

interface TeamDetailProps {
  team: Team;
}

const TeamDetail: React.FC<TeamDetailProps> = ({ team }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <TeamHeroBanner team={team} />
      
      {/* Team Photo */}
      <TeamPhotoSection teamName={team.name} />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <TeamDescription team={team} />
          <TeamAchievements team={team} />
        </div>
        
        {/* Right Column - Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <TeamInfoCard team={team} />
            <SocialLinks links={team.socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
