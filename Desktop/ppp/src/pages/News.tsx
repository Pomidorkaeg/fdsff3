import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Search, Calendar, ChevronDown, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample news data
  const newsItems = [
    {
      id: '1',
      title: 'ФК Сибирь одержал победу над Спартаком в матче 3 лиги',
      excerpt: 'Футбольный клуб Сибирь выиграл со счетом 2:0 в домашнем матче против Спартака. Голы забили Андрей Попов и Сергей Козлов.',
      content: 'Полный текст новости о победе над Спартаком...',
      category: 'matches',
      date: '15.05.2024',
      time: '18:30',
      views: 1245,
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=2574&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Новый тренер присоединился к команде перед важным матчем',
      excerpt: 'Иван Петров назначен новым главным тренером ФК Сибирь. Он приступит к обязанностям со следующей недели.',
      content: 'Полный текст новости о новом тренере...',
      category: 'club',
      date: '10.05.2024',
      time: '12:45',
      views: 987,
      image: 'https://images.unsplash.com/photo-1518164147695-36c13dd568f5?q=80&w=2670&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Открыт набор в детскую футбольную школу ФК Сибирь',
      excerpt: 'Футбольный клуб Сибирь объявляет о наборе детей в возрасте от 5 до 12 лет в детскую футбольную школу.',
      content: 'Полный текст новости о наборе в футбольную школу...',
      category: 'academy',
      date: '05.05.2024',
      time: '10:15',
      views: 567,
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2574&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'ФК Сибирь подписал контракт с перспективным нападающим',
      excerpt: 'Александр Новиков присоединился к нашей команде. 22-летний нападающий подписал контракт на три года.',
      content: 'Полный текст новости о новом игроке...',
      category: 'transfers',
      date: '01.05.2024',
      time: '14:20',
      views: 1532,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?q=80&w=2787&auto=format&fit=crop'
    },
    {
      id: '5',
      title: 'Обзор матча ФК Сибирь - Локомотив',
      excerpt: 'Представляем вашему вниманию полный обзор матча с Локомотивом, который состоялся в рамках чемпионата города.',
      content: 'Полный текст обзора матча с Локомотивом...',
      category: 'matches',
      date: '28.04.2024',
      time: '09:30',
      views: 854,
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop'
    },
    {
      id: '6',
      title: 'Изменения в расписании тренировок юношеской команды',
      excerpt: 'Внимание! С 1 июня изменяется расписание тренировок для юношеской команды 2010-2011 годов рождения.',
      content: 'Полный текст новости об изменении расписания...',
      category: 'academy',
      date: '25.04.2024',
      time: '11:40',
      views: 423,
      image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2670&auto=format&fit=crop'
    }
  ];
  
  const filteredNews = newsItems.filter((item) => {
    // Apply category filter
    if (category !== 'all' && item.category !== category) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 page-transition">
        {/* Header */}
        <div className="relative bg-fc-green text-white py-16">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-fc-green/90 to-fc-darkGreen/80"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold mb-4">Новости</h1>
              <p className="max-w-2xl text-white/80 text-lg">
                Будьте в курсе последних событий из жизни футбольного клуба Сибирь
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === 'all' 
                    ? 'bg-fc-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Все новости
              </button>
              
              <button
                onClick={() => setCategory('matches')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === 'matches' 
                    ? 'bg-fc-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Матчи
              </button>
              
              <button
                onClick={() => setCategory('club')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === 'club' 
                    ? 'bg-fc-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Клуб
              </button>
              
              <button
                onClick={() => setCategory('transfers')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === 'transfers' 
                    ? 'bg-fc-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Трансферы
              </button>
              
              <button
                onClick={() => setCategory('academy')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === 'academy' 
                    ? 'bg-fc-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Академия
              </button>
            </div>
            
            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск новостей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-72 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-fc-green/50"
              />
            </div>
          </div>
        </section>
        
        {/* News List */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">По вашему запросу не найдено новостей</p>
              <button
                onClick={() => { setSearchQuery(''); setCategory('all'); }}
                className="px-4 py-2 bg-fc-green text-white rounded-md hover:bg-fc-darkGreen transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured News (first item) */}
              <div className="lg:col-span-2">
                <Link
                  to={`/news/${filteredNews[0].id}`}
                  className="group block rounded-xl overflow-hidden shadow-sm border border-gray-200 card-hover"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={filteredNews[0].image} 
                      alt={filteredNews[0].title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center text-white text-sm mb-2">
                        <Calendar size={14} className="mr-2" />
                        <span>{filteredNews[0].date}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-2" />
                        <span>{filteredNews[0].time}</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {filteredNews[0].title}
                      </h3>
                      <p className="text-white/80 line-clamp-2 mb-4">
                        {filteredNews[0].excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                          {filteredNews[0].category === 'matches' ? 'Матчи' : 
                           filteredNews[0].category === 'club' ? 'Клуб' : 
                           filteredNews[0].category === 'transfers' ? 'Трансферы' : 
                           'Академия'}
                        </span>
                        <div className="flex items-center text-white text-sm">
                          <Eye size={14} className="mr-2" />
                          <span>{filteredNews[0].views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Other News Items */}
              <div className="lg:col-span-1 space-y-6">
                {filteredNews.slice(1, 4).map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="group block rounded-xl overflow-hidden shadow-sm border border-gray-200 card-hover"
                  >
                    <div className="flex flex-col sm:flex-row lg:flex-col">
                      <div className="sm:w-1/3 lg:w-full">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-fc-green text-xs font-medium">
                              {item.category === 'matches' ? 'Матчи' : 
                               item.category === 'club' ? 'Клуб' : 
                               item.category === 'transfers' ? 'Трансферы' : 
                               'Академия'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:w-2/3 lg:w-full">
                        <div className="flex items-center text-gray-500 text-xs mb-2">
                          <Calendar size={12} className="mr-1" />
                          <span>{item.date}</span>
                          <span className="mx-1">•</span>
                          <Eye size={12} className="mr-1" />
                          <span>{item.views}</span>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-fc-green transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Remaining News Items */}
              <div className="lg:col-span-3 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.slice(4).map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group block rounded-xl overflow-hidden shadow-sm border border-gray-200 card-hover"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-fc-green text-xs font-medium">
                            {item.category === 'matches' ? 'Матчи' : 
                             item.category === 'club' ? 'Клуб' : 
                             item.category === 'transfers' ? 'Трансферы' : 
                             'Академия'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye size={12} className="mr-1" />
                            <span>{item.views}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-fc-green transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
