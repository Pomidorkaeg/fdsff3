
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/types/player';
import { getTeamsData } from '@/utils/teamsData';

interface PlayerBasicInfoFormProps {
  formData: Player;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PlayerBasicInfoForm: React.FC<PlayerBasicInfoFormProps> = ({ formData, handleChange }) => {
  const teams = getTeamsData();
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">ФИО игрока</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="position">Позиция</Label>
        <select 
          id="position" 
          name="position" 
          value={formData.position} 
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="Вратарь">Вратарь</option>
          <option value="Защитник">Защитник</option>
          <option value="Полузащитник">Полузащитник</option>
          <option value="Нападающий">Нападающий</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="number">Номер</Label>
        <Input 
          id="number" 
          name="number" 
          type="number" 
          value={formData.number} 
          onChange={handleChange}
          min="1"
          max="99"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="nationality">Национальность</Label>
        <Input 
          id="nationality" 
          name="nationality" 
          value={formData.nationality} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="birthDate">Дата рождения</Label>
        <Input 
          id="birthDate" 
          name="birthDate" 
          value={formData.birthDate} 
          onChange={handleChange}
          placeholder="ДД.ММ.ГГГГ"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="teamId">Команда</Label>
        <select 
          id="teamId" 
          name="teamId" 
          value={formData.teamId} 
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlayerBasicInfoForm;
