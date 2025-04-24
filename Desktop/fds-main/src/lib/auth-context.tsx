import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, getCurrentAdmin, isAdminAuthenticated, Admin, SharedAdminData, getSharedAdminData, updateSharedAdminData } from '@/utils/api/admin';
import { connectWebSocket, disconnectWebSocket, sendWebSocketMessage } from '@/utils/api/websocket';

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  sharedData: SharedAdminData | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  syncData: () => Promise<void>;
  updateSharedData: (data: Partial<SharedAdminData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [sharedData, setSharedData] = useState<SharedAdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAdminAuthenticated()) {
          setIsAuthenticated(true);
          setAdmin(getCurrentAdmin());
          try {
            await syncData();
          } catch (error) {
            console.error('Error syncing admin data:', error);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      try {
        connectWebSocket((data) => {
          if (data.type === 'sharedDataUpdate') {
            setSharedData(data.data);
          }
        });
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }

      return () => {
        try {
          disconnectWebSocket();
        } catch (error) {
          console.error('Error disconnecting from WebSocket:', error);
        }
      };
    }
  }, [isAuthenticated]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await loginAdmin(username, password);
      setIsAuthenticated(true);
      setAdmin(response.admin);
      await syncData();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      logoutAdmin();
      setIsAuthenticated(false);
      setAdmin(null);
      setSharedData(null);
      disconnectWebSocket();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const syncData = async () => {
    try {
      const data = await getSharedAdminData();
      setSharedData(data);
    } catch (error) {
      console.error('Sync error:', error);
      // Don't throw the error to prevent blocking the UI
    }
  };

  const updateSharedData = async (data: Partial<SharedAdminData>) => {
    try {
      await updateSharedAdminData(data);
      sendWebSocketMessage('sharedDataUpdate', data);
      await syncData();
    } catch (error) {
      console.error('Update error:', error);
      // Don't throw the error to prevent blocking the UI
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, sharedData, login, logout, syncData, updateSharedData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 