import { News } from '../../types/news';
import { getAuthHeaders } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export const fetchNews = async (): Promise<News[]> => {
  try {
    const response = await fetch(`${API_URL}/news`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const addNews = async (news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>): Promise<News> => {
  try {
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(news),
    });

    if (!response.ok) {
      throw new Error('Failed to add news');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
};

export const updateNews = async (id: string, news: Partial<News>): Promise<News> => {
  try {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(news),
    });

    if (!response.ok) {
      throw new Error('Failed to update news');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

export const deleteNews = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete news');
    }
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}; 