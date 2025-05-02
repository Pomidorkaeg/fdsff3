import { useState, useEffect } from 'react';
import { News } from '../types/news';
import { fetchNews } from '../utils/api/news';

const STORAGE_KEY = 'fc_news';

const getLocalNews = (): News[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalNews = (news: News[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
};

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const data = await fetchNews();
        setNews(data);
        saveLocalNews(data); // Cache the data
        setError(null);
      } catch (err) {
        console.error('Error loading news from API:', err);
        // If API fails, try to load from local storage
        const localNews = getLocalNews();
        if (localNews.length > 0) {
          setNews(localNews);
          setError('Используются сохраненные данные (API недоступен)');
        } else {
          setError('Ошибка при загрузке новостей');
        }
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { news, loading, error };
}; 