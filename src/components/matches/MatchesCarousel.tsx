import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Trophy, MapPin } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/hooks/useMatches';

const MatchesCarousel: React.FC = () => {
  const { matches, isLoading } = useMatches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (!isAutoPlaying || !matches || matches.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection('right');
      handleSlideChange('right');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [matches, isAutoPlaying]);

  const handleSlideChange = (newDirection: 'left' | 'right') => {
    if (isAnimating || !matches || matches.length === 0) return;
    
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-fc-green"></div>
      </div>
    );
  }
  
  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Нет запланированных матчей</p>
      </div>
    );
  }
  
  const currentMatch = matches[currentIndex];
  
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <Card 
        className={`p-3 sm:p-6 transition-all duration-500 ease-out transform ${
          isAnimating && direction === 'right' ? 'translate-x-full opacity-0 scale-95' :
          isAnimating && direction === 'left' ? '-translate-x-full opacity-0 scale-95' :
          'translate-x-0 opacity-100 scale-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentMatch.status === 'live' ? 'bg-fc-green text-white animate-pulse' :
              currentMatch.status === 'finished' ? 'bg-gray-200 text-gray-700' :
              'bg-fc-yellow text-gray-900'
            }`}>
              {currentMatch.status === 'live' ? 'Идет матч' :
               currentMatch.status === 'finished' ? 'Завершен' :
               'Запланирован'}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{currentMatch.date} {currentMatch.time}</span>
            </div>
          </div>
          
          {matches.length > 1 && (
            <div className="flex gap-2 self-end sm:self-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMatch}
                disabled={isAnimating}
                className="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 hover:scale-110 hover:bg-fc-green hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMatch}
                disabled={isAnimating}
                className="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 hover:scale-110 hover:bg-fc-green hover:text-white active:scale-95"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm sm:text-lg font-semibold">{currentMatch.homeTeam}</div>
          </div>
          <div className="flex items-center gap-3">
            {currentMatch.status !== 'scheduled' && currentMatch.score && (
              <div className="text-lg sm:text-2xl font-bold">
                {currentMatch.score.home} - {currentMatch.score.away}
              </div>
            )}
            {currentMatch.status === 'scheduled' && (
              <div className="text-base sm:text-xl font-bold">vs</div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-right">
            <div className="text-sm sm:text-lg font-semibold">{currentMatch.awayTeam}</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{currentMatch.competition}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{currentMatch.venue}</span>
          </div>
        </div>
      </Card>
      
      {matches.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          {matches.map((_, index) => (
            <button
              key={index}
              disabled={isAnimating}
              onClick={() => {
                if (index === currentIndex) return;
                handleSlideChange(index > currentIndex ? 'right' : 'left');
                setIsAutoPlaying(false);
              }}
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-fc-green w-3 sm:w-4 scale-110' 
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