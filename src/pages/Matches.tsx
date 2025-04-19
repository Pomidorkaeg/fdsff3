import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Filter, ChevronDown, MapPin, ChevronLeft, ChevronRight, Trophy, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/hooks/useMatches';

const Matches = () => {
  const { matches, isLoading } = useMatches();
  const [filter, setFilter] = useState<'upcoming' | 'completed' | 'live'>('upcoming');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const filteredMatches = useMemo(() => {
    const now = new Date();
    return matches.filter(match => {
      const matchDate = new Date(`${match.date}T${match.time}`);
      
      switch (filter) {
        case 'upcoming':
          return matchDate > now && match.status === 'scheduled';
        case 'completed':
          return matchDate < now || match.status === 'finished';
        case 'live':
          return match.status === 'live';
        default:
          return true;
      }
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return filter === 'completed' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  }, [matches, filter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fc-green"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'live':
        return 'bg-fc-green text-white animate-pulse';
      case 'finished':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-fc-yellow text-gray-900';
    }
  };

  const getStatusText = (status: Match['status']) => {
    switch (status) {
      case 'live':
        return 'Идет матч';
      case 'finished':
        return 'Завершен';
      default:
        return 'Запланирован';
    }
  };

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
        <div className="relative bg-fc-green text-white py-8 sm:py-16">
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
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4 sm:mb-6">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Матчи</h1>
              <p className="max-w-2xl text-white/80 text-sm sm:text-lg">
                Расписание прошедших и предстоящих матчей ФК Сибирь
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <section className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('upcoming')}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                  filter === 'upcoming' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Предстоящие
              </button>
              
              <button
                onClick={() => setFilter('live')}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                  filter === 'live' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Идут сейчас
              </button>
              
              <button
                onClick={() => setFilter('completed')}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                  filter === 'completed' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Прошедшие
              </button>
            </div>
            
            {filter === 'completed' && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePreviousMonth}
                  className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="text-xs sm:text-sm font-medium">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                
                <button 
                  onClick={handleNextMonth}
                  className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Matches List */}
        <section className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Нет матчей по выбранному фильтру</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="p-3 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                        {getStatusText(match.status)}
                      </span>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{formatDate(match.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{formatTime(match.time)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
                    <div className="flex-1 text-center sm:text-left">
                      <div className="text-sm sm:text-lg font-semibold">{match.homeTeam}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {match.status !== 'scheduled' && match.score ? (
                        <div className="text-lg sm:text-2xl font-bold">
                          {match.score.home} - {match.score.away}
                        </div>
                      ) : (
                        <div className="text-base sm:text-xl font-bold">vs</div>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-right">
                      <div className="text-sm sm:text-lg font-semibold">{match.awayTeam}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{match.competition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{match.venue}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Matches;
