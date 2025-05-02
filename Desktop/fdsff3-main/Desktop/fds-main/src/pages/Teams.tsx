import React from 'react';
import TeamsSection from '@/components/teams/TeamsSection';

const Teams: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Команды</h1>
      <TeamsSection />
    </div>
  );
};

export default Teams; 