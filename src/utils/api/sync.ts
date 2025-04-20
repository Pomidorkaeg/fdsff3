import { getAuthHeaders } from './auth';
import { SiteData } from '@/types/site';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export const syncData = async (): Promise<SiteData> => {
  try {
    const response = await fetch(`${API_URL}/api/sync/data`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Ошибка синхронизации данных');
    }

    return await response.json();
  } catch (error) {
    console.error('Error syncing data:', error);
    throw error;
  }
};

export const subscribeToUpdates = (callback: (data: SiteData) => void): (() => void) => {
  const eventSource = new EventSource(`${API_URL}/api/sync/updates`, {
    withCredentials: true,
  });

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      callback(data);
    } catch (error) {
      console.error('Error parsing update:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('Error in update subscription:', error);
    eventSource.close();
  };

  return () => eventSource.close();
}; 