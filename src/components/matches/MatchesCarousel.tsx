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
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (!isAutoPlaying || matches.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection('right');
      handleSlideChange('right');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [matches.length, isAutoPlaying]);

  const handleSlideChange = (newDirection: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(newDirection);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (newDirection === 'right') {
          return prevIndex === matches.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? matches.length - 1 : prevIndex - 1;
        }
      });
      setTimeout(() => setIsAnimating(false), 500);
    }, 250);
  };
  
  const nextMatch = () => {
    handleSlideChange('right');
    setIsAutoPlaying(false);
  };
  
  const prevMatch = () => {
    handleSlideChange('left');
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
    <div className="relative overflow-hidden w-full">
      <Card 
        className={`p-4 sm:p-6 transition-all duration-500 ease-out transform ${
          isAnimating && direction === 'right' ? 'translate-x-full opacity-0 scale-95' :
          isAnimating && direction === 'left' ? '-translate-x-full opacity-0 scale-95' :
          'translate-x-0 opacity-100 scale-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
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
              <span className="text-sm sm:text-base">{currentMatch.date} {currentMatch.time}</span>
            </div>
          </div>
          
          {matches.length > 1 && (
            <div className="flex gap-2 self-end sm:self-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMatch}
                disabled={isAnimating}
                className="h-7 w-7 sm:h-8 sm:w-8 transition-all duration-300 hover:scale-110 hover:bg-fc-green hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMatch}
                disabled={isAnimating}
                className="h-7 w-7 sm:h-8 sm:w-8 transition-all duration-300 hover:scale-110 hover:bg-fc-green hover:text-white active:scale-95"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-base sm:text-lg font-semibold">{currentMatch.homeTeam}</div>
          </div>
          <div className="flex items-center gap-3">
            {currentMatch.status !== 'scheduled' && (
              <div className="text-xl sm:text-2xl font-bold">
                {currentMatch.score?.home} - {currentMatch.score?.away}
              </div>
            )}
            {currentMatch.status === 'scheduled' && (
              <div className="text-lg sm:text-xl font-bold">vs</div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-right">
            <div className="text-base sm:text-lg font-semibold">{currentMatch.awayTeam}</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{currentMatch.competition}</span>
          </div>
          <div className="text-xs sm:text-sm">{currentMatch.venue}</div>
        </div>
      </Card>
      
      {matches.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {matches.map((_, index) => (
            <button
              key={index}
              disabled={isAnimating}
              onClick={() => {
                if (index === currentIndex) return;
                handleSlideChange(index > currentIndex ? 'right' : 'left');
                setIsAutoPlaying(false);
              }}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-fc-green w-4 scale-110' 
                  : 'bg-gray-300 hover:bg-fc-green/50 hover:scale-110'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesCarousel; 