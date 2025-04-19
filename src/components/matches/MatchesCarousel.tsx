import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Trophy, MapPin, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/hooks/useMatches';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const MatchesCarousel = () => {
  const { matches, isLoading } = useMatches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (matches.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [matches]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Нет запланированных матчей</p>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">{currentMatch.competition}</h3>
            <p className="text-sm text-muted-foreground">{currentMatch.venue}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <p className="text-xl font-bold">{currentMatch.homeTeam}</p>
              {currentMatch.status === 'finished' && currentMatch.score && (
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-bold">
                    {currentMatch.score.home} - {currentMatch.score.away}
                  </span>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium">{currentMatch.date}</p>
              <p className="text-lg font-medium">{currentMatch.time}</p>
              <div className={`mt-2 px-3 py-1 rounded-full text-sm ${
                currentMatch.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                currentMatch.status === 'live' ? 'bg-green-100 text-green-800 animate-pulse' :
                'bg-gray-100 text-gray-800'
              }`}>
                {currentMatch.status === 'scheduled' ? 'Запланирован' :
                 currentMatch.status === 'live' ? 'В прямом эфире' :
                 'Завершен'}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-bold">{currentMatch.awayTeam}</p>
              {currentMatch.status === 'finished' && currentMatch.score && (
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-bold">
                    {currentMatch.score.home} - {currentMatch.score.away}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {matches.length > 1 && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="p-2 rounded-full bg-background hover:bg-accent"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="p-2 rounded-full bg-background hover:bg-accent"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchesCarousel; 