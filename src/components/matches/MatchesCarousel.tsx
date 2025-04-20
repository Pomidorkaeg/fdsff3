import React, { useState, useEffect } from 'react';
import { useSite } from '@/lib/site-context';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const MatchesCarousel: React.FC = () => {
  const { data, isLoading, error, refreshData } = useSite();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const matches = data?.matches || [];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      toast.success('Данные обновлены');
    } catch (err) {
      toast.error('Ошибка при обновлении данных');
    } finally {
      setIsRefreshing(false);
    }
  };

  const nextMatch = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevMatch = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-fc-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Нет запланированных матчей</p>
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
          
          <div className="text-gray-600">
            <p>Место проведения: {currentMatch.venue}</p>
            <p>Турнир: {currentMatch.competition}</p>
            {currentMatch.score && (
              <p className="mt-2 text-lg font-semibold">
                Счет: {currentMatch.score.home} - {currentMatch.score.away}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Button
          onClick={prevMatch}
          disabled={isAnimating || matches.length <= 1}
          className="bg-fc-green hover:bg-fc-darkGreen text-white"
        >
          Предыдущий
        </Button>
        <Button
          onClick={nextMatch}
          disabled={isAnimating || matches.length <= 1}
          className="bg-fc-green hover:bg-fc-darkGreen text-white"
        >
          Следующий
        </Button>
      </div>
    </div>
  );
};

export default MatchesCarousel; 