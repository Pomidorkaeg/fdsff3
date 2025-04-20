import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, getCurrentAdmin, isAdminAuthenticated, syncAdminData, Admin, SharedAdminData, getSharedAdminData, subscribeToAdminUpdates } from '@/utils/api/admin';

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

  useEffect(() => {
    const checkAuth = async () => {
      if (isAdminAuthenticated()) {
        setIsAuthenticated(true);
        setAdmin(getCurrentAdmin());
        try {
          await syncData();
        } catch (error) {
          console.error('Error syncing admin data:', error);
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = subscribeToAdminUpdates((data) => {
        setSharedData(data);
      });

      return () => unsubscribe();
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
    logoutAdmin();
    setIsAuthenticated(false);
    setAdmin(null);
    setSharedData(null);
  };

  const syncData = async () => {
    try {
      const data = await getSharedAdminData();
      setSharedData(data);
    } catch (error) {
      console.error('Sync error:', error);
      throw error;
    }
  };

  const updateSharedData = async (data: Partial<SharedAdminData>) => {
    try {
      await updateSharedAdminData(data);
      await syncData();
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

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