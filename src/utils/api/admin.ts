import { getAuthHeaders } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';

export interface Admin {
  id: string;
  username: string;
  role: 'admin' | 'superadmin';
  lastLogin: string;
}

export interface AdminAuthResponse {
  token: string;
  admin: Admin;
}

export const loginAdmin = async (username: string, password: string): Promise<AdminAuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Неверные учетные данные');
    }

    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminData', JSON.stringify(data.admin));
    return data;
  } catch (error) {
    console.error('Error logging in admin:', error);
    throw error;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
};

export const getCurrentAdmin = (): Admin | null => {
  const adminData = localStorage.getItem('adminData');
  return adminData ? JSON.parse(adminData) : null;
};

export const isAdminAuthenticated = (): boolean => {
  return !!localStorage.getItem('adminToken');
};

export const syncAdminData = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/sync`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Ошибка синхронизации данных');
    }

    const data = await response.json();
    // Update local storage with synced data
    localStorage.setItem('adminData', JSON.stringify(data));
  } catch (error) {
    console.error('Error syncing admin data:', error);
    throw error;
  }
}; 