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
  // Check for default admin credentials
  if (username === 'admin' && password === '305a') {
    const defaultAdmin: Admin = {
      id: '1',
      username: 'admin',
      role: 'superadmin',
      lastLogin: new Date().toISOString()
    };
    
    const response = {
      token: 'default-admin-token',
      admin: defaultAdmin
    };
    
    localStorage.setItem('adminToken', response.token);
    localStorage.setItem('adminData', JSON.stringify(response.admin));
    return response;
  }

  // If not default credentials, try API login
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
    throw new Error('Неверные учетные данные');
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

export interface SharedAdminData {
  matches: Match[];
  news: News[];
  teams: Team[];
  media: Media[];
  lastUpdated: string;
}

export const getSharedAdminData = async (): Promise<SharedAdminData> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/shared-data`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Ошибка получения общих данных');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shared admin data:', error);
    throw error;
  }
};

export const updateSharedAdminData = async (data: Partial<SharedAdminData>): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/shared-data`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка обновления общих данных');
    }
  } catch (error) {
    console.error('Error updating shared admin data:', error);
    throw error;
  }
};

export const subscribeToAdminUpdates = (callback: (data: SharedAdminData) => void): (() => void) => {
  const eventSource = new EventSource(`${API_URL}/api/admin/updates`);
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  };

  eventSource.onerror = (error) => {
    console.error('Error in admin updates subscription:', error);
    eventSource.close();
  };

  return () => eventSource.close();
}; 