
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { Player } from '@/types/player';
import PlayerBasicInfoForm from './PlayerBasicInfoForm';
import PlayerPhysicalStatsForm from './PlayerPhysicalStatsForm';
import PlayerMatchStatsForm from './PlayerMatchStatsForm';
import { toast } from '@/components/ui/use-toast';

interface PlayerEditorProps {
  player: Player;
  onSave: (player: Player) => void;
  onCancel: () => void;
}

const PlayerEditor: React.FC<PlayerEditorProps> = ({ player, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Player>({ ...player });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (['number', 'height', 'weight', 'matches', 'goals', 'assists', 'yellowCards', 'redCards'].includes(name)) {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!formData.name.trim()) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Имя игрока не может быть пустым",
        });
        return;
      }
      
      if (formData.number < 1 || formData.number > 99) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Номер игрока должен быть от 1 до 99",
        });
        return;
      }
      
      onSave(formData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка при сохранении",
        description: "Произошла ошибка при сохранении игрока",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <PlayerBasicInfoForm formData={formData} handleChange={handleChange} />
        
        {/* Right Column - Physical & Statistics */}
        <div className="space-y-4">
          <PlayerPhysicalStatsForm formData={formData} handleChange={handleChange} />
          <PlayerMatchStatsForm formData={formData} handleChange={handleChange} />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
        <Button variant="outline" type="button" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" /> Отмена
        </Button>
        <Button type="submit" className="bg-fc-green hover:bg-fc-darkGreen">
          <Save className="mr-2 h-4 w-4" /> Сохранить
        </Button>
      </div>
    </form>
  );
};

export default PlayerEditor;
