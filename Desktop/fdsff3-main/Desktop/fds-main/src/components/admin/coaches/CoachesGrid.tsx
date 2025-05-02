
import React from 'react';
import { Coach } from '@/types/coach';
import CoachCard from './CoachCard';

interface CoachesGridProps {
  coaches: Coach[];
  onEdit: (coach: Coach) => void;
  onDelete: (coachId: string) => void;
}

const CoachesGrid: React.FC<CoachesGridProps> = ({ coaches, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coaches.map((coach) => (
        <CoachCard 
          key={coach.id} 
          coach={coach} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
      
      {coaches.length === 0 && (
        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500">
            Тренеры не найдены. Добавьте первого тренера!
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachesGrid;
