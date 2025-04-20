import React, { useState } from 'react';
import { useMatches } from '@/hooks/useMatches';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const MatchesCarousel: React.FC = () => {
  const { matches, loading, error } = useMatches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    try {
      window.location.reload();
    } catch (err) {
      toast.error('Ошибка при обновлении данных');
    } finally {
      setIsRefreshing(false);
    }
  };

  const nextMatch = () => {
    if (isAnimating || matches.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevMatch = () => {
    if (isAnimating || matches.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-fc-green" />
          <p className="text-gray-500">Загрузка матчей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg space-y-4">
        <div className="flex items-center text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-fc-green hover:bg-fc-darkGreen text-white"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Попробовать снова
        </Button>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg space-y-4">
        <p className="text-gray-500">Нет запланированных матчей</p>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-fc-green hover:bg-fc-darkGreen text-white"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {currentMatch.homeTeam} vs {currentMatch.awayTeam}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Дата</p>
              <p className="font-medium">{currentMatch.date}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Время</p>
              <p className="font-medium">{currentMatch.time}</p>
            </div>
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500">Место проведения</p>
            <p className="font-medium">{currentMatch.venue}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Турнир</p>
            <p className="font-medium">{currentMatch.competition}</p>
          </div>
        </div>
        {matches.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevMatch}
              disabled={isAnimating}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextMatch}
              disabled={isAnimating}
              className="text-gray-500 hover:text-gray-700"
            >
              Вперед
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesCarousel; 