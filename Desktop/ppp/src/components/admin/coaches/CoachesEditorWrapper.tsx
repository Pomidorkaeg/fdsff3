
import React from 'react';
import { Coach } from '@/types/coach';
import CoachEditor from '@/pages/admin/CoachEditor';

interface CoachesEditorWrapperProps {
  currentCoach: Coach;
  onSave: (coach: Coach) => void;
  onCancel: () => void;
}

const CoachesEditorWrapper: React.FC<CoachesEditorWrapperProps> = ({ 
  currentCoach, 
  onSave, 
  onCancel 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {currentCoach.id.includes('coach-') && !currentCoach.id.includes('coach1') && !currentCoach.id.includes('coach2') && !currentCoach.id.includes('coach3')
            ? 'Добавить нового тренера' 
            : 'Редактировать тренера'
          }
        </h2>
      </div>
      
      <CoachEditor 
        coach={currentCoach} 
        onSave={onSave} 
        onCancel={onCancel} 
      />
    </div>
  );
};

export default CoachesEditorWrapper;
