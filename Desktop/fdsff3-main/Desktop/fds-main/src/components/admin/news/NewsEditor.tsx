import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Save } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'matches' | 'club';
  date: string;
  time: string;
  image: string;
  views: number;
}

interface NewsEditorProps {
  news: NewsItem;
  onSave: (news: NewsItem) => void;
  onCancel: () => void;
}

const NewsEditor: React.FC<NewsEditorProps> = ({ news, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewsItem>(news);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }
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
              <Label htmlFor="excerpt">Краткое описание</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Содержание новости</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={10}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
              {formData.image && (
                <div className="mt-2 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
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
                  <SelectItem value="matches">Матчи</SelectItem>
                  <SelectItem value="club">Клуб</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <Label htmlFor="time">Время</Label>
                <Input
                  id="time"
                  name="time"
                  type="text"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
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

export default NewsEditor;