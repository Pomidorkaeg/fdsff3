
import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamEditorHeaderProps {
  onCancel: () => void;
  onSave: () => void;
}

const TeamEditorHeader: React.FC<TeamEditorHeaderProps> = ({ onCancel, onSave }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold">Редактирование команды</h3>
      <div className="space-x-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" /> Отмена
        </Button>
        <Button size="sm" onClick={onSave} className="bg-fc-green hover:bg-fc-darkGreen">
          <Save className="h-4 w-4 mr-1" /> Сохранить
        </Button>
      </div>
    </div>
  );
};

export default TeamEditorHeader;
