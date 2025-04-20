import React from 'react';
import MatchesCarousel from '@/components/matches/MatchesCarousel';
import NewsSection from '@/components/news/NewsSection';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Ближайшие матчи</h2>
        <MatchesCarousel />
      </section>
      
      <section>
        <h2 className="text-3xl font-bold mb-6">Последние новости</h2>
        <NewsSection />
      </section>
    </div>
  );
};

export default Home; 