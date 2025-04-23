import { getAuthHeaders } from './auth';
import { SiteData } from '@/types/site';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

const DEFAULT_SITE_DATA: SiteData = {
  players: [],
  teams: [],
  matches: [],
  news: [],
  media: [],
  lastUpdated: new Date().toISOString(),
};

export const syncData = async (): Promise<SiteData> => {
  try {
    const response = await fetch(`${API_URL}/api/sync/data`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Ошибка синхронизации данных');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error syncing data:', error);
    // Return default data if API is not available
    return DEFAULT_SITE_DATA;
  }
};

export const subscribeToUpdates = (callback: (data: SiteData) => void): (() => void) => {
  try {
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
  } catch (error) {
    console.error('Error creating EventSource:', error);
    // Return a no-op function if EventSource is not supported
    return () => {};
  }
}; 