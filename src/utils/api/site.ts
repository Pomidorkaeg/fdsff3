const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export interface SiteData {
  matches: any[];
  news: any[];
  teams: any[];
  media: any[];
  lastUpdated: string;
}

export const fetchSiteData = async (): Promise<SiteData> => {
  try {
    const response = await fetch(`${API_URL}/api/site/data`);
    
    if (!response.ok) {
      throw new Error('Ошибка получения данных сайта');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching site data:', error);
    throw error;
  }
};

export const subscribeToSiteUpdates = (callback: (data: SiteData) => void): (() => void) => {
  const eventSource = new EventSource(`${API_URL}/api/site/updates`);
  
  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      callback(data);
    } catch (error) {
      console.error('Error parsing site update:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('Error in site updates subscription:', error);
    eventSource.close();
  };

  return () => eventSource.close();
}; 