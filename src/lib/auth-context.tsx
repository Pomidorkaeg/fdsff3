import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, getCurrentAdmin, isAdminAuthenticated, syncAdminData, Admin } from '@/utils/api/admin';

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  syncData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);

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

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await loginAdmin(username, password);
      setIsAuthenticated(true);
      setAdmin(response.admin);
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
  };

  const syncData = async () => {
    try {
      await syncAdminData();
      setAdmin(getCurrentAdmin());
    } catch (error) {
      console.error('Sync error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout, syncData }}>
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