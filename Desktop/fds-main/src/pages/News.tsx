import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { getAllNews } from '@/utils/news/newsOperations';
import type { NewsItem } from '@/utils/news/newsOperations';

const News = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'matches' | 'club'>('all');
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setNews(getAllNews());
  }, []);

  const filteredNews = news.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="relative bg-fc-darkGreen text-white py-12">
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Новости клуба</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Актуальные новости о матчах, событиях и жизни клуба
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 py-4">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'ghost'}
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-fc-green hover:bg-fc-darkGreen' : ''}
              >
                Все новости
              </Button>
              <Button
                variant={activeFilter === 'matches' ? 'default' : 'ghost'}
                onClick={() => setActiveFilter('matches')}
                className={activeFilter === 'matches' ? 'bg-fc-green hover:bg-fc-darkGreen' : ''}
              >
                Матчи
              </Button>
              <Button
                variant={activeFilter === 'club' ? 'default' : 'ghost'}
                onClick={() => setActiveFilter('club')}
                className={activeFilter === 'club' ? 'bg-fc-green hover:bg-fc-darkGreen' : ''}
              >
                Клуб
              </Button>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative">
                    <img 
                      src={item.image || '/placeholder.svg'} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-fc-green text-white text-xs rounded-full">
                        {item.category === 'matches' ? 'Матчи' : 'Клуб'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>{item.date} {item.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                <p>Новости не найдены</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
