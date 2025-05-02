import React from 'react';
import { cn } from '@/lib/utils';
import { Trophy, Users, Users2, ChartBar } from 'lucide-react';

interface TeamTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  primaryColor: string;
}

const TeamTabs: React.FC<TeamTabsProps> = ({ activeTab, onTabChange, primaryColor }) => {
  return (
    <div className="bg-white shadow-md sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto no-scrollbar">
          <button
            onClick={() => onTabChange('players')}
            className={cn(
              "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === 'players' 
                ? `border-[${primaryColor}] text-[${primaryColor}]` 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            style={{ 
              borderColor: activeTab === 'players' ? primaryColor : 'transparent',
              color: activeTab === 'players' ? primaryColor : ''
            }}
          >
            <div className="flex items-center gap-2">
              <Users size={16} />
              Игроки
            </div>
          </button>

          <button
            onClick={() => onTabChange('staff')}
            className={cn(
              "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === 'staff' 
                ? `border-[${primaryColor}] text-[${primaryColor}]` 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            style={{ 
              borderColor: activeTab === 'staff' ? primaryColor : 'transparent',
              color: activeTab === 'staff' ? primaryColor : ''
            }}
          >
            <div className="flex items-center gap-2">
              <Users2 size={16} />
              Тренерский штаб
            </div>
          </button>

          <button
            onClick={() => onTabChange('details')}
            className={cn(
              "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === 'details' 
                ? `border-[${primaryColor}] text-[${primaryColor}]` 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            style={{ 
              borderColor: activeTab === 'details' ? primaryColor : 'transparent',
              color: activeTab === 'details' ? primaryColor : ''
            }}
          >
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              О команде
            </div>
          </button>
          
          <button
            onClick={() => onTabChange('statistics')}
            className={cn(
              "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === 'statistics' 
                ? `border-[${primaryColor}] text-[${primaryColor}]` 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            style={{ 
              borderColor: activeTab === 'statistics' ? primaryColor : 'transparent',
              color: activeTab === 'statistics' ? primaryColor : ''
            }}
          >
            <div className="flex items-center gap-2">
              <ChartBar size={16} />
              Статистика
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamTabs;
