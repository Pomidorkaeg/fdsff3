
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/types/player';

interface PlayerPhysicalStatsFormProps {
  formData: Player;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PlayerPhysicalStatsForm: React.FC<PlayerPhysicalStatsFormProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <Label htmlFor="image">URL фото</Label>
        <Input 
          id="image" 
          name="image" 
          value={formData.image} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Рост (см)</Label>
          <Input 
            id="height" 
            name="height" 
            type="number" 
            value={formData.height} 
            onChange={handleChange}
            min="150"
            max="220"
            required
          />
        </div>
        <div>
          <Label htmlFor="weight">Вес (кг)</Label>
          <Input 
            id="weight" 
            name="weight" 
            type="number" 
            value={formData.weight} 
            onChange={handleChange}
            min="50"
            max="120"
            required
          />
        </div>
      </div>
    </>
  );
};

export default PlayerPhysicalStatsForm;
