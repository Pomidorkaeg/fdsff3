import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { MediaItem } from '@/utils/media/mediaOperations';

interface MediaEditorProps {
  media: MediaItem;
  onSave: (media: MediaItem) => void;
  onCancel: () => void;
}

const MediaEditor: React.FC<MediaEditorProps> = ({ media, onSave, onCancel }) => {
  const [formData, setFormData] = useState<MediaItem>(media);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Тип медиа</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange({ name: 'type', value: value as 'image' | 'video' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Фото</SelectItem>
                  <SelectItem value="video">Видео</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Категория</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange({ name: 'category', value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Матчи</SelectItem>
                  <SelectItem value="training">Тренировки</SelectItem>
                  <SelectItem value="interview">Интервью</SelectItem>
                  <SelectItem value="stadium">Стадион</SelectItem>
                  <SelectItem value="academy">Академия</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="thumbnail">URL миниатюры</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
              />
              {formData.thumbnail && (
                <div className="mt-2 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="url">URL {formData.type === 'video' ? 'видео' : 'изображения'}</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Отмена
          </Button>
          <Button type="submit" className="bg-fc-green hover:bg-fc-darkGreen">
            <Save className="mr-2 h-4 w-4" /> Сохранить
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default MediaEditor;