
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Team } from '@/types/team';

interface TeamBasicInfoFormProps {
  team: Team;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamBasicInfoForm: React.FC<TeamBasicInfoFormProps> = ({ team, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Название команды</Label>
        <Input 
          id="name" 
          name="name" 
          value={team.name} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="shortName">Краткое название</Label>
        <Input 
          id="shortName" 
          name="shortName" 
          value={team.shortName} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="logo">URL логотипа</Label>
        <Input 
          id="logo" 
          name="logo" 
          value={team.logo} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="backgroundImage">URL фонового изображения</Label>
        <Input 
          id="backgroundImage" 
          name="backgroundImage" 
          value={team.backgroundImage} 
          onChange={onChange} 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primaryColor">Основной цвет</Label>
          <div className="flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: team.primaryColor }}
            ></div>
            <Input 
              id="primaryColor" 
              name="primaryColor" 
              value={team.primaryColor} 
              onChange={onChange} 
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="secondaryColor">Дополнительный цвет</Label>
          <div className="flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: team.secondaryColor }}
            ></div>
            <Input 
              id="secondaryColor" 
              name="secondaryColor" 
              value={team.secondaryColor} 
              onChange={onChange} 
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={team.description} 
          onChange={onChange} 
          rows={4}
        />
      </div>
    </div>
  );
};

export default TeamBasicInfoForm;
