
import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Team } from '@/types/team';

interface TeamEditorProps {
  team: Team;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TeamEditor: React.FC<TeamEditorProps> = ({ team, onCancel, onSave, onChange }) => {
  return (
    <div className="p-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
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
        
        {/* Details */}
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
        </div>
      </div>
    </div>
  );
};

export default TeamEditor;
