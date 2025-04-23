import { toast } from '@/components/ui/use-toast';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'matches' | 'club';
  date: string;
  time: string;
  image: string;
  views: number;
}

// Initialize or load news from localStorage
export const loadNews = (): NewsItem[] => {
  try {
    const savedNews = localStorage.getItem('news');
    if (savedNews) {
      return JSON.parse(savedNews);
    }
  } catch (error) {
    console.error('Failed to load news from localStorage:', error);
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: "Не удалось загрузить новости",
    });
  }
  return [];
};

// Save news to localStorage
export const saveNews = (news: NewsItem[]): void => {
  try {
    localStorage.setItem('news', JSON.stringify(news));
  } catch (error) {
    console.error('Failed to save news to localStorage:', error);
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: "Не удалось сохранить новости",
    });
  }
};

// Get all news
export const getAllNews = (): NewsItem[] => {
  return loadNews();
};

// Add a new news item
export const createNews = (newsItem: NewsItem): void => {
  const news = loadNews();
  news.push(newsItem);
  saveNews(news);
};

// Update an existing news item
export const updateNews = (updatedNews: NewsItem): void => {
  const news = loadNews();
  const index = news.findIndex(item => item.id === updatedNews.id);
  if (index !== -1) {
    news[index] = updatedNews;
    saveNews(news);
  }
};

// Delete a news item
export const deleteNews = (id: string): void => {
  const news = loadNews();
  const updatedNews = news.filter(item => item.id !== id);
  saveNews(updatedNews);
};