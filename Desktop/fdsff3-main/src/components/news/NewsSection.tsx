import React, { useState } from 'react';
import { useNews } from '@/hooks/useNews';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const NewsSection: React.FC = () => {
  const { news, loading, error } = useNews();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Reload the page to refresh data
      window.location.reload();
    } catch (err) {
      toast.error('Ошибка при обновлении данных');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
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

  if (news.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Нет новостей</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {format(new Date(item.publishDate), 'd MMMM yyyy', { locale: ru })}
              </p>
              <p className="text-gray-600 line-clamp-3">{item.content}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsSection; 