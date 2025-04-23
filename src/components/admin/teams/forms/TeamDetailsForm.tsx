
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Team } from '@/types/team';

interface TeamDetailsFormProps {
  team: Team;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamDetailsForm: React.FC<TeamDetailsFormProps> = ({ team, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="coach">Главный тренер</Label>
        <Input 
          id="coach" 
          name="coach" 
          value={team.coach} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="foundedYear">Год основания</Label>
        <Input 
          id="foundedYear" 
          name="foundedYear" 
          type="number"
          value={team.foundedYear} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="stadium">Стадион</Label>
        <Input 
          id="stadium" 
          name="stadium" 
          value={team.stadium} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="address">Адрес</Label>
        <Input 
          id="address" 
          name="address" 
          value={team.address} 
          onChange={onChange} 
        />
      </div>
      
      <div>
        <Label htmlFor="achievements">Достижения (каждое с новой строки)</Label>
        <Textarea 
          id="achievements" 
          name="achievements" 
          value={team.achievements.join('\n')} 
          onChange={onChange} 
          rows={4}
        />
      </div>
    </div>
  );
};

export default TeamDetailsForm;
