import { getAuthHeaders } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fcgudauta.ru';
const WS_URL = API_URL.replace('http', 'ws');

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export const connectWebSocket = (onMessage: (data: any) => void) => {
  if (socket) {
    return;
  }

  const token = localStorage.getItem('adminToken');
  if (!token) {
    console.error('No admin token found');
    return;
  }

  socket = new WebSocket(`${WS_URL}/ws/admin?token=${token}`);

  socket.onopen = () => {
    console.log('WebSocket connected');
    reconnectAttempts = 0;
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
    socket = null;
    
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      setTimeout(() => connectWebSocket(onMessage), 1000 * reconnectAttempts);
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendWebSocketMessage = (type: string, data: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type, data }));
  }
}; 