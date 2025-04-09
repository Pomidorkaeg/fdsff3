
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Image as ImageIcon, Video, ChevronDown, Search, Calendar, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  date: string;
  thumbnail: string;
  url: string;
  category: string;
}

const Media = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample media data
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      title: 'Тренировка команды перед матчем с Енисеем',
      date: '08.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'training'
    },
    {
      id: '2',
      type: 'image',
      title: 'Матч ФК Сибирь - Спартак',
      date: '15.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1550881111-7cfde14b8073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      url: 'https://images.unsplash.com/photo-1550881111-7cfde14b8073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      category: 'match'
    },
    {
      id: '3',
      type: 'video',
      title: 'Обзор матча ФК Сибирь - Енисей',
      date: '11.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'match'
    },
    {
      id: '4',
      type: 'image',
      title: 'Стадион Спартак перед матчем',
      date: '14.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2093&q=80',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2093&q=80',
      category: 'stadium'
    },
    {
      id: '5',
      type: 'video',
      title: 'Интервью с главным тренером',
      date: '18.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'interview'
    },
    {
      id: '6',
      type: 'image',
      title: 'Тренировка юношеской команды',
      date: '05.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&auto=format&fit=crop',
      url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&auto=format&fit=crop',
      category: 'academy'
    },
    {
      id: '7',
      type: 'video',
      title: 'Лучшие моменты матча с ЦСКА',
      date: '06.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'match'
    },
    {
      id: '8',
      type: 'image',
      title: 'Игроки команды после тренировки',
      date: '07.04.2024',
      thumbnail: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'training'
    }
  ];
  
  const filteredMedia = mediaItems.filter((item) => {
    // Apply type filter
    if (filter === 'images' && item.type !== 'image') return false;
    if (filter === 'videos' && item.type !== 'video') return false;
    
    // Apply category filter
    if (filter === 'match' && item.category !== 'match') return false;
    if (filter === 'training' && item.category !== 'training') return false;
    if (filter === 'interview' && item.category !== 'interview') return false;
    if (filter === 'stadium' && item.category !== 'stadium') return false;
    if (filter === 'academy' && item.category !== 'academy') return false;
    
    // Apply search filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 page-transition">
        {/* Header */}
        <div className="relative bg-fc-green text-white py-16">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-fc-green/90 to-fc-darkGreen/80"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1567464825372-887fb33902be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <ImageIcon className="w-8 h-8" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Медиа галерея</h1>
              <p className="max-w-2xl text-white/80 text-lg">
                Фотографии и видео с матчей, тренировок и других мероприятий клуба
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'all' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Все медиа
              </button>
              
              <button
                onClick={() => handleFilterChange('images')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'images' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Фото
              </button>
              
              <button
                onClick={() => handleFilterChange('videos')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'videos' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Видео
              </button>
              
              <button
                onClick={() => handleFilterChange('match')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'match' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Матчи
              </button>
              
              <button
                onClick={() => handleFilterChange('training')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'training' 
                    ? "bg-fc-green text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Тренировки
              </button>
            </div>
            
            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск медиа..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-72 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-fc-green/50"
              />
            </div>
          </div>
        </section>
        
        {/* Media Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">По вашему запросу не найдено медиафайлов</p>
              <button
                onClick={() => { setSearchQuery(''); setFilter('all'); }}
                className="px-4 py-2 bg-fc-green text-white rounded-md hover:bg-fc-darkGreen transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((item) => (
                <div 
                  key={item.id}
                  className="group rounded-xl overflow-hidden shadow-sm border border-gray-200 card-hover"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="text-white w-12 h-12" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          item.type === 'image' 
                            ? "bg-fc-green/80 text-white backdrop-blur-sm" 
                            : "bg-fc-red/80 text-white backdrop-blur-sm"
                        )}>
                          {item.type === 'image' ? 'Фото' : 'Видео'}
                        </span>
                        
                        <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 text-xs font-medium">
                          {item.category === 'match' ? 'Матч' : 
                           item.category === 'training' ? 'Тренировка' : 
                           item.category === 'interview' ? 'Интервью' : 
                           item.category === 'stadium' ? 'Стадион' : 
                           'Академия'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="flex items-center text-white/90 text-xs mb-1">
                        <Calendar size={12} className="mr-1" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-white font-medium line-clamp-2 group-hover:text-white/90 transition-colors">
                        {item.title}
                      </h3>
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

export default Media;
