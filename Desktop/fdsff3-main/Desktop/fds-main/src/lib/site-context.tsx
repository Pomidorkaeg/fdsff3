import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData } from '@/types/site';
import { syncData, subscribeToUpdates } from '@/utils/api/sync';
import { useAuth } from './auth-context';

interface SiteContextType {
  data: SiteData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newData = await syncData();
      setData(newData);
      localStorage.setItem('siteData', JSON.stringify(newData));
    } catch (err) {
      console.error('Error refreshing site data:', err);
      
      // Try to load from cache if API fails
      const cachedData = localStorage.getItem('siteData');
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setError('Используются сохраненные данные (API недоступен)');
      } else {
        setError('Ошибка загрузки данных сайта');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    const initializeData = async () => {
      // Load initial data from cache
      const cachedData = localStorage.getItem('siteData');
      if (cachedData && mounted) {
        setData(JSON.parse(cachedData));
      }

      // Refresh data from API
      await refreshData();

      // Subscribe to updates if authenticated
      if (isAuthenticated && mounted) {
        unsubscribe = subscribeToUpdates((newData) => {
          if (mounted) {
            setData(newData);
            localStorage.setItem('siteData', JSON.stringify(newData));
          }
        });
      }
    };

    initializeData();

    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated]);

  return (
    <SiteContext.Provider value={{ data, isLoading, error, refreshData }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}; 