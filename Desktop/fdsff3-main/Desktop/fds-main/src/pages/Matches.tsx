import React from 'react';
import MatchesCarousel from '@/components/matches/MatchesCarousel';

const Matches: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Матчи</h1>
      <MatchesCarousel />
    </div>
  );
};

export default Matches;
