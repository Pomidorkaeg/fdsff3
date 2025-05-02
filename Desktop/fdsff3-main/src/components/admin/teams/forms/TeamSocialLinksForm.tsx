
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Team } from '@/types/team';

interface TeamSocialLinksFormProps {
  team: Team;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamSocialLinksForm: React.FC<TeamSocialLinksFormProps> = ({ team, onChange }) => {
  return (
    <div className="space-y-3 border p-4 rounded-md">
      <Label>Социальные сети</Label>
      
      <div>
        <Label htmlFor="socialLinks.website" className="text-sm">Вебсайт</Label>
        <Input 
          id="socialLinks.website" 
          name="socialLinks.website" 
          value={team.socialLinks.website || ''} 
          onChange={onChange} 
          placeholder="https://example.com"
        />
      </div>
      
      <div>
        <Label htmlFor="socialLinks.instagram" className="text-sm">Instagram</Label>
        <Input 
          id="socialLinks.instagram" 
          name="socialLinks.instagram" 
          value={team.socialLinks.instagram || ''} 
          onChange={onChange} 
          placeholder="https://instagram.com/teamname"
        />
      </div>
      
      <div>
        <Label htmlFor="socialLinks.facebook" className="text-sm">Facebook</Label>
        <Input 
          id="socialLinks.facebook" 
          name="socialLinks.facebook" 
          value={team.socialLinks.facebook || ''} 
          onChange={onChange} 
          placeholder="https://facebook.com/teamname"
        />
      </div>
      
      <div>
        <Label htmlFor="socialLinks.twitter" className="text-sm">Twitter</Label>
        <Input 
          id="socialLinks.twitter" 
          name="socialLinks.twitter" 
          value={team.socialLinks.twitter || ''} 
          onChange={onChange} 
          placeholder="https://twitter.com/teamname"
        />
      </div>
    </div>
  );
};

export default TeamSocialLinksForm;
