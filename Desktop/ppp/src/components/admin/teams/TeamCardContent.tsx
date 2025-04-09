
import React from 'react';
import { Info, Star, Award, MapPin, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { Team } from '@/types/team';

interface TeamCardContentProps {
  team: Team;
}

const TeamCardContent: React.FC<TeamCardContentProps> = ({ team }) => {
  return (
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 mr-2 text-fc-green" />
            <h4 className="font-semibold">О команде</h4>
          </div>
          <p className="text-gray-600 mb-4">
            {team.description}
          </p>
          
          <div className="flex items-center mt-6 mb-3">
            <Star className="w-5 h-5 mr-2 text-fc-green" />
            <h4 className="font-semibold">Стадион</h4>
          </div>
          <p className="text-gray-600">
            {team.stadium}
          </p>
        </div>
        
        <div>
          <div className="flex items-center mb-3">
            <Award className="w-5 h-5 mr-2 text-fc-green" />
            <h4 className="font-semibold">Достижения</h4>
          </div>
          <ul className="space-y-2">
            {team.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-fc-green mt-2 mr-2"></div>
                <span className="text-gray-600">{achievement}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center mt-6 mb-3">
            <MapPin className="w-5 h-5 mr-2 text-fc-green" />
            <h4 className="font-semibold">Адрес</h4>
          </div>
          <p className="text-gray-600">
            {team.address}
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {team.socialLinks.website && (
            <div className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-700 flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Сайт
            </div>
          )}
          {team.socialLinks.instagram && (
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-sm text-white flex items-center">
              <Instagram className="w-4 h-4 mr-1" />
              Instagram
            </div>
          )}
          {team.socialLinks.facebook && (
            <div className="px-3 py-1 bg-blue-600 rounded text-sm text-white flex items-center">
              <Facebook className="w-4 h-4 mr-1" />
              Facebook
            </div>
          )}
          {team.socialLinks.twitter && (
            <div className="px-3 py-1 bg-blue-400 rounded text-sm text-white flex items-center">
              <Twitter className="w-4 h-4 mr-1" />
              Twitter
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
};

export default TeamCardContent;
