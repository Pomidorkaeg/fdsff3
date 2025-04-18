import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Filter, ChevronDown, MapPin, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'live' | 'finished';
  score?: {
    home: number;
    away: number;
  };
}

const Matches = () => {
  const [filter, setFilter] = useState('upcoming');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [matches, setMatches] = useState<Match[]>([]);
  
  // Load matches from localStorage
  useEffect(() => {
    const loadedMatches = localStorage.getItem('matches');
    if (loadedMatches) {
      setMatches(JSON.parse(loadedMatches));
    }
  }, []);
  
  // Filter matches based on status and month
  const filteredMatches = matches.filter((match) => {
    if (filter === 'upcoming' && match.status === 'scheduled') {
      return true;
    }
    if (filter === 'completed' && match.status === 'finished') {
      return true;
    }
    return false;
  }).filter((match) => {
    if (filter === 'upcoming') {
      // For upcoming matches, show all future matches
      return true;
    } else {
      // For completed matches, filter by selected month
      const matchDate = new Date(match.date);
      return matchDate.getMonth() === currentMonth;
    }
  });
  
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 page-transition">
        {/* Header */}
        <div className="relative bg-fc-green text-white py-16">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-fc-green/90 to-fc-darkGreen/80"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Матчи</h1>
              <p className="max-w-2xl text-white/80 text-lg">
                Расписание прошедших и предстоящих матчей ФК Сибирь
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('upcoming')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'upcoming' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Предстоящие матчи
              </button>
              
              <button
                onClick={() => setFilter('completed')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'completed' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Прошедшие матчи
              </button>
            </div>
            
            {filter === 'completed' && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePreviousMonth}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="text-sm font-medium">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                
                <button 
                  onClick={handleNextMonth}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Matches List */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid gap-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      match.status === 'live' ? 'bg-fc-green text-white' :
                      match.status === 'finished' ? 'bg-gray-200 text-gray-700' :
                      'bg-fc-yellow text-gray-900'
                    }`}>
                      {match.status === 'live' ? 'Идет матч' :
                       match.status === 'finished' ? 'Завершен' :
                       'Запланирован'}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{match.date} {match.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{match.homeTeam}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {match.status !== 'scheduled' && match.score && (
                      <div className="text-2xl font-bold">
                        {match.score.home} - {match.score.away}
                      </div>
                    )}
                    {match.status === 'scheduled' && (
                      <div className="text-xl font-bold">vs</div>
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-lg font-semibold">{match.awayTeam}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    {match.competition}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {match.venue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Matches;
