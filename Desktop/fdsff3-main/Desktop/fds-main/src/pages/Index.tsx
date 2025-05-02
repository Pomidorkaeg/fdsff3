import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TournamentCard from '@/components/TournamentCard';
import LazyTournamentTable from '@/components/LazyTournamentTable';
import MatchesCarousel from '@/components/matches/MatchesCarousel';
import { ArrowRight, Trophy, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getTournamentsList, Tournament } from '@/utils/api';

const Index = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredTournament, setFeaturedTournament] = useState<Tournament | null>(null);
  
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournamentsList();
        setTournaments(data);
        const featured = data.find((t: any) => t.featured) || data[0];
        setFeaturedTournament(featured);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setLoading(false);
      }
    };
    
    fetchTournaments();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow page-transition">
        {/* Hero and Matches Section */}
        <div className="relative min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://github.com/Pomidorkaeg/photo/blob/main/382be63e-ead7-422c-b229-31831c415198.png?raw=true)',
              height: '100vh',
              width: '100%'
            }}
          ></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-screen">
                <div className="text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Добро пожаловать в ФК "Гудаута"
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">
                    Официальный сайт футбольного клуба
                  </p>
                  <div className="flex gap-4">
                    <Button asChild size="lg" className="bg-fc-green hover:bg-fc-darkGreen">
                      <Link to="/team">О команде</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      <Link to="/matches">Расписание матчей</Link>
                    </Button>
                  </div>
                </div>
                <div className="lg:pl-8">
                  <MatchesCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Tournament Table Section */}
        <section className="pt-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ТЕКУЩЕЕ ПОЛОЖЕНИЕ В ТАБЛИЦЕ</h2>
              <div className="w-24 h-1 bg-fc-yellow mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Актуальные данные о положении команд в турнирной таблице
              </p>
              
              {featuredTournament && !loading && (
                <div className="inline-flex items-center text-fc-darkGreen font-medium">
                  <Trophy size={18} className="mr-2" />
                  {featuredTournament.title}
                </div>
              )}
            </div>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              {featuredTournament && !loading ? (
                <LazyTournamentTable 
                  tournamentId={featuredTournament.id} 
                  source={featuredTournament.source}
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
                </div>
              )}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild variant="subtle" size="lg">
                <Link to="/tournaments" className="inline-flex items-center">
                  Все турнирные таблицы
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Club Values Section */}
        <section className="bg-fc-darkGreen text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-fc-yellow mb-6 drop-shadow-md">ФУТБОЛ — ЭТО БОЛЬШЕ ЧЕМ ИГРА</h2>
              <div className="w-24 h-1 bg-fc-yellow mx-auto mb-6"></div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">Наш клуб воспитывает характер, дисциплину и командный дух</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-fc-green/30 p-8 rounded-lg border-l-4 border-fc-yellow shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-start mb-6">
                  <Trophy className="text-fc-yellow mr-4 h-10 w-10" />
                  <h3 className="text-2xl font-bold">Традиции</h3>
                </div>
                <p className="text-white/80 text-lg">
                  Богатая история и традиции нашего клуба — основа нашего развития и достижений на футбольном поле.
                </p>
              </div>
              
              <div className="bg-fc-green/30 p-8 rounded-lg border-l-4 border-fc-yellow shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-start mb-6">
                  <Users className="text-fc-yellow mr-4 h-10 w-10" />
                  <h3 className="text-2xl font-bold">Команда</h3>
                </div>
                <p className="text-white/80 text-lg">
                  Наши игроки — это единая команда профессионалов, нацеленных на результат и постоянное совершенствование.
                </p>
              </div>
              
              <div className="bg-fc-green/30 p-8 rounded-lg border-l-4 border-fc-yellow shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-start mb-6">
                  <Star className="text-fc-yellow mr-4 h-10 w-10" />
                  <h3 className="text-2xl font-bold">Развитие</h3>
                </div>
                <p className="text-white/80 text-lg">
                  Мы постоянно развиваемся, ставим амбициозные цели и достигаем новых высот в мире футбола.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* All Tournaments Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-fc-yellow pl-4">ТУРНИРЫ И СОРЕВНОВАНИЯ</h2>
                <p className="text-gray-600 max-w-2xl">
                  Следите за актуальными турнирными таблицами и результатами всех соревнований с участием нашего клуба
                </p>
              </div>
              
              <Button asChild variant="default" size="lg" className="mt-4 md:mt-0">
                <Link to="/tournaments" className="inline-flex items-center">
                  Все соревнования
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-72 rounded-xl bg-gray-100 animate-pulse shadow"></div>
                ))
              ) : (
                tournaments
                  .filter((tournament: any) => tournament.featured || tournament.type === 'регулярный')
                  .slice(0, 3)
                  .map((tournament: any) => (
                    <TournamentCard
                      key={tournament.id}
                      id={tournament.id}
                      title={tournament.title}
                      type={tournament.type}
                      season={tournament.season}
                      teams={tournament.teams}
                      source={tournament.source}
                      featured={tournament.featured}
                    />
                  ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
