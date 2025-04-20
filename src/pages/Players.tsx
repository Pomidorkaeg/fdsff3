import React from 'react';
import PlayersList from '@/components/players/PlayersList';

const Players: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Игроки</h1>
      <PlayersList />
    </div>
  );
};

export default Players; 