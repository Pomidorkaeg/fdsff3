import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Trophy } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/hooks/useMatches';

const MatchesCarousel: React.FC = () => {
  const { matches } = useMatches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  useEffect(() => {
    if (!isAutoPlaying || matches.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === matches.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [matches.length, isAutoPlaying]);
  
  const nextMatch = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === matches.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };
  
  const prevMatch = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? matches.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };
  
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Нет запланированных матчей</p>
      </div>
    );
  }
  
  const currentMatch = matches[currentIndex];
  
  return (
    <div className="relative">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentMatch.status === 'live' ? 'bg-fc-green text-white' :
              currentMatch.status === 'finished' ? 'bg-gray-200 text-gray-700' :
              'bg-fc-yellow text-gray-900'
            }`}>
              {currentMatch.status === 'live' ? 'Идет матч' :
               currentMatch.status === 'finished' ? 'Завершен' :
               'Запланирован'}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{currentMatch.date} {currentMatch.time}</span>
            </div>
          </div>
          
          {matches.length > 1 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMatch}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMatch}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="text-lg font-semibold">{currentMatch.homeTeam}</div>
          </div>
          <div className="flex items-center gap-3">
            {currentMatch.status !== 'scheduled' && (
              <div className="text-2xl font-bold">
                {currentMatch.score?.home} - {currentMatch.score?.away}
              </div>
            )}
            {currentMatch.status === 'scheduled' && (
              <div className="text-xl font-bold">vs</div>
            )}
          </div>
          <div className="flex-1 text-right">
            <div className="text-lg font-semibold">{currentMatch.awayTeam}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            {currentMatch.competition}
          </div>
          <div>{currentMatch.venue}</div>
        </div>
      </Card>
      
      {matches.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {matches.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-fc-green' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesCarousel; 