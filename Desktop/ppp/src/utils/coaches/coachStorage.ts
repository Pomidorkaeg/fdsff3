
import { Coach } from '@/types/coach';
import { initialCoaches } from './initialCoachesData';

// Try to load coaches from localStorage, or use initialCoaches if not found
export const loadCoaches = (): Coach[] => {
  try {
    const savedCoaches = localStorage.getItem('coaches');
    if (savedCoaches) {
      return JSON.parse(savedCoaches);
    }
  } catch (error) {
    console.error('Failed to load coaches from localStorage:', error);
  }
  
  // Save initial coaches to localStorage on first load
  try {
    localStorage.setItem('coaches', JSON.stringify(initialCoaches));
  } catch (error) {
    console.error('Failed to save initial coaches to localStorage:', error);
  }
  
  return initialCoaches;
};

// Save coaches to localStorage
export const saveCoaches = (coaches: Coach[]): void => {
  try {
    localStorage.setItem('coaches', JSON.stringify(coaches));
  } catch (error) {
    console.error('Failed to save coaches to localStorage:', error);
  }
};
