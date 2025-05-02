import { News } from '../../types/news';

const mockNews: News[] = [
  {
    id: '1',
    title: 'ФК Сибирь одержал победу над Спартаком в матче 3 лиги',
    content: 'Полный текст новости о победе над Спартаком...',
    author: 'Админ',
    publishDate: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=2574&auto=format&fit=crop',
    category: 'match',
    tags: ['матч', 'победа'],
    isPublished: true,
    views: 1245,
    likes: 100,
    comments: [],
    relatedMatches: [],
    relatedPlayers: [],
  },
  {
    id: '2',
    title: 'Новый тренер присоединился к команде перед важным матчем',
    content: 'Полный текст новости о новом тренере...',
    author: 'Админ',
    publishDate: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1518164147695-36c13dd568f5?q=80&w=2670&auto=format&fit=crop',
    category: 'club',
    tags: ['тренер', 'команда'],
    isPublished: true,
    views: 987,
    likes: 50,
    comments: [],
    relatedMatches: [],
    relatedPlayers: [],
  }
];

export const fetchNews = async (): Promise<News[]> => {
  return [...mockNews];
};

export const addNews = async (news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>): Promise<News> => {
  const newNews: News = {
    ...news,
    id: `news${Date.now()}`,
    isPublished: true,
    publishDate: new Date().toISOString(),
    views: 0,
    likes: 0,
    comments: [],
    relatedMatches: [],
    relatedPlayers: [],
  } as News;
  mockNews.push(newNews);
  return newNews;
};

export const updateNews = async (id: string, news: Partial<News>): Promise<News> => {
  const idx = mockNews.findIndex(n => n.id === id);
  if (idx === -1) throw new Error('News not found');
  mockNews[idx] = { ...mockNews[idx], ...news };
  return mockNews[idx];
};

export const deleteNews = async (id: string): Promise<void> => {
  const idx = mockNews.findIndex(n => n.id === id);
  if (idx !== -1) mockNews.splice(idx, 1);
}; 