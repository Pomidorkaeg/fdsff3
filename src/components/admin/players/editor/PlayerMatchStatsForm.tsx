
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/types/player';

interface PlayerMatchStatsFormProps {
  formData: Player;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PlayerMatchStatsForm: React.FC<PlayerMatchStatsFormProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="matches">Матчи</Label>
          <Input 
            id="matches" 
            name="matches" 
            type="number" 
            value={formData.matches} 
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="goals">Голы</Label>
          <Input 
            id="goals" 
            name="goals" 
            type="number" 
            value={formData.goals} 
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="assists">Передачи</Label>
          <Input 
            id="assists" 
            name="assists" 
            type="number" 
            value={formData.assists} 
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="yellowCards">Жёлтые карточки</Label>
          <Input 
            id="yellowCards" 
            name="yellowCards" 
            type="number" 
            value={formData.yellowCards} 
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="redCards">Красные карточки</Label>
          <Input 
            id="redCards" 
            name="redCards" 
            type="number" 
            value={formData.redCards} 
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>
    </>
  );
};

export default PlayerMatchStatsForm;
