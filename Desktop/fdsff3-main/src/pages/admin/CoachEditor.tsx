
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { Coach } from '@/types/coach';
import { getTeamsData } from '@/utils/teamsData';

interface CoachEditorProps {
  coach: Coach;
  onSave: (coach: Coach) => void;
  onCancel: () => void;
}

const CoachEditor: React.FC<CoachEditorProps> = ({ coach, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Coach>({ ...coach });
  const teams = getTeamsData();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (['experience'].includes(name)) {
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
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">ФИО тренера</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="role">Должность</Label>
            <Input 
              id="role" 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="since">В клубе с</Label>
            <Input 
              id="since" 
              name="since" 
              value={formData.since} 
              onChange={handleChange}
              placeholder="Год"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="experience">Опыт работы (лет)</Label>
            <Input 
              id="experience" 
              name="experience" 
              type="number" 
              value={formData.experience} 
              onChange={handleChange}
              min="0"
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
        
        {/* Right Column */}
        <div className="space-y-4">
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
          
          <div>
            <Label htmlFor="biography">Биография</Label>
            <Textarea 
              id="biography" 
              name="biography" 
              value={formData.biography} 
              onChange={handleChange}
              rows={7}
              required
            />
          </div>
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

export default CoachEditor;
