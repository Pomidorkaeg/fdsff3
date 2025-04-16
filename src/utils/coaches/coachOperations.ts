
import { Coach } from '@/types/coach';
import { loadCoaches, saveCoaches } from './coachStorage';

// Initialize coaches array
let coaches: Coach[] = loadCoaches();

// Get all coaches
export const getCoachesData = (): Coach[] => {
  return [...coaches];
};

// Get coaches for a specific team
export const getCoachesByTeam = (teamId: string): Coach[] => {
  return coaches.filter(coach => coach.teamId === teamId);
};

// Get a specific coach by ID
export const getCoachById = (id: string): Coach | undefined => {
  return coaches.find(coach => coach.id === id);
};

// Update a coach
export const updateCoach = (updatedCoach: Coach): void => {
  coaches = coaches.map(coach => 
    coach.id === updatedCoach.id ? updatedCoach : coach
  );
  
  // Save changes to localStorage
  saveCoaches(coaches);
};

// Add a new coach
export const createCoach = (newCoach: Coach): void => {
  coaches.push(newCoach);
  
  // Save changes to localStorage
  saveCoaches(coaches);
};

// Delete a coach
export const deleteCoach = (id: string): void => {
  coaches = coaches.filter(coach => coach.id !== id);
  
  // Save changes to localStorage
  saveCoaches(coaches);
};
