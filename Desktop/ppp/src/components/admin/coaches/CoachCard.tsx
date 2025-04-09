
import React from 'react';
import { Pencil, Trash, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Coach } from '@/types/coach';

interface CoachCardProps {
  coach: Coach;
  onEdit: (coach: Coach) => void;
  onDelete: (coachId: string) => void;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, onEdit, onDelete }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all"
    >
      <div className="relative h-48">
        <img 
          src={coach.image} 
          alt={coach.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs font-medium text-white/70 mb-1">
            {coach.role}
          </div>
          <h3 className="text-xl font-bold text-white">{coach.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">С {coach.since} года</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-amber-500" />
            <span className="text-sm">{coach.experience} лет опыта</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {coach.biography}
        </p>
        
        <div className="flex justify-end space-x-2 mt-auto">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(coach)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(coach.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;
