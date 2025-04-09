
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Filter, ChevronDown, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Matches = () => {
  const [filter, setFilter] = useState('upcoming');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Sample match data
  const matchesData = [
    // Upcoming matches
    {
      id: '1',
      tournament: '3 Лига ПФЛ',
      tournamentId: 'league-3',
      homeTeam: 'ФК Сибирь',
      awayTeam: 'Спартак',
      date: '15.05.2024',
      time: '19:00',
      stadium: 'Стадион Спартак',
      city: 'Новосибирск',
      status: 'upcoming',
      result: null,
      month: 4 // May (0-indexed)
    },
    {
      id: '2',
      tournament: 'Кубок России',
      tournamentId: 'russia-cup',
      homeTeam: 'ФК Сибирь',
      awayTeam: 'Спартак',
      date: '20.05.2024',
      time: '17:00',
      stadium: 'Стадион Спартак',
      city: 'Новосибирск',
      status: 'upcoming',
      result: null,
      month: 4 // May
    },
    {
      id: '3',
      tournament: 'Чемпионат города Новосибирска',
      tournamentId: 'novosibirsk-championship',
      homeTeam: 'ФК Сибирь',
      awayTeam: 'Локомотив',
      date: '25.05.2024',
      time: '16:00',
      stadium: 'Стадион Локомотив',
      city: 'Новосибирск',
      status: 'upcoming',
      result: null,
      month: 4 // May
    },
    {
      id: '4',
      tournament: 'Кубок победы',
      tournamentId: 'victory-cup',
      homeTeam: 'Динамо',
      awayTeam: 'ФК Сибирь',
      date: '05.06.2024',
      time: '18:30',
      stadium: 'Стадион Динамо',
      city: 'Барнаул',
      status: 'upcoming',
      result: null,
      month: 5 // June
    },
    
    // Past matches
    {
      id: '5',
      tournament: '3 Лига ПФЛ',
      tournamentId: 'league-3',
      homeTeam: 'ФК Сибирь',
      awayTeam: 'Енисей',
      date: '10.04.2024',
      time: '17:00',
      stadium: 'Стадион Спартак',
      city: 'Новосибирск',
      status: 'completed',
      result: { homeGoals: 2, awayGoals: 1 },
      month: 3 // April
    },
    {
      id: '6',
      tournament: 'Кубок России',
      tournamentId: 'russia-cup',
      homeTeam: 'ЦСКА',
      awayTeam: 'ФК Сибирь',
      date: '05.04.2024',
      time: '19:30',
      stadium: 'Арена ЦСКА',
      city: 'Москва',
      status: 'completed',
      result: { homeGoals: 3, awayGoals: 1 },
      month: 3 // April
    },
    {
      id: '7',
      tournament: 'Чемпионат города Новосибирска',
      tournamentId: 'novosibirsk-championship',
      homeTeam: 'ФК Сибирь',
      awayTeam: 'Динамо',
      date: '28.03.2024',
      time: '16:00',
      stadium: 'Стадион Спартак',
      city: 'Новосибирск',
      status: 'completed',
      result: { homeGoals: 1, awayGoals: 1 },
      month: 2 // March
    },
    {
      id: '8',
      tournament: 'Кубок новосибирской области',
      tournamentId: 'novosibirsk-region-cup',
      homeTeam: 'Локомотив',
      awayTeam: 'ФК Сибирь',
      date: '15.03.2024',
      time: '15:00',
      stadium: 'Стадион Локомотив',
      city: 'Новосибирск',
      status: 'completed',
      result: { homeGoals: 0, awayGoals: 2 },
      month: 2 // March
    }
  ];
  
  // Filter matches based on status and month
  const filteredMatches = matchesData.filter((match) => {
    if (filter === 'upcoming' && match.status === 'upcoming') {
      return true;
    }
    if (filter === 'completed' && match.status === 'completed') {
      return true;
    }
    return false;
  }).filter((match) => {
    if (filter === 'upcoming') {
      // For upcoming matches, show all future matches
      return true;
    } else {
      // For completed matches, filter by selected month
      return match.month === currentMonth;
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
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {filter === 'upcoming' 
                  ? 'Нет предстоящих матчей' 
                  : `Нет прошедших матчей в ${monthNames[currentMonth]} ${currentYear}`}
              </p>
              {filter === 'completed' && (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handlePreviousMonth}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Предыдущий месяц
                  </button>
                  
                  <button
                    onClick={handleNextMonth}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
                  >
                    Следующий месяц
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredMatches.map((match) => (
                <div 
                  key={match.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 card-hover"
                >
                  <div className="p-4 border-b border-gray-100 bg-fc-green/5 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-fc-green">
                        {match.tournament}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{match.date}</span>
                      <span className="text-gray-300">|</span>
                      <span>{match.time}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <div className="font-bold text-xl mb-1">{match.homeTeam}</div>
                        <div className="text-sm text-gray-500">Хозяева</div>
                      </div>
                      
                      <div className="flex-shrink-0 px-4">
                        {match.status === 'completed' ? (
                          <div className="text-2xl font-bold">
                            {match.result?.homeGoals} - {match.result?.awayGoals}
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-gray-400">VS</div>
                        )}
                      </div>
                      
                      <div className="text-center flex-1">
                        <div className="font-bold text-xl mb-1">{match.awayTeam}</div>
                        <div className="text-sm text-gray-500">Гости</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{match.stadium}, г. {match.city}</span>
                      </div>
                      
                      {match.status === 'completed' ? (
                        <a 
                          href={`/tournaments/${match.tournamentId}`}
                          className="text-fc-green hover:underline"
                        >
                          Турнирная таблица
                        </a>
                      ) : (
                        <div className="px-3 py-1 bg-fc-yellow/10 text-fc-yellow rounded-full text-xs font-medium">
                          Предстоящий матч
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
