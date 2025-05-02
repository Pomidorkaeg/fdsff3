import React, { useState } from 'react';
import { Player, PlayerPosition, PreferredFoot } from '@/types/player';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlayerFormProps {
  player?: Player | null;
  onSubmit: (data: Partial<Player>) => void;
  onCancel: () => void;
}

export const PlayerForm: React.FC<PlayerFormProps> = ({ player, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Player>>({
    firstName: player?.firstName || '',
    lastName: player?.lastName || '',
    position: player?.position || 'forward',
    number: player?.number,
    dateOfBirth: player?.dateOfBirth || '',
    nationality: player?.nationality || '',
    height: player?.height,
    weight: player?.weight,
    preferredFoot: player?.preferredFoot || 'right',
    biography: player?.biography || '',
    image: player?.image || '',
    contractEndDate: player?.contractEndDate || '',
    isActive: player?.isActive ?? true,
    stats: player?.stats || {
      appearances: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      cleanSheets: 0
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      number: isNaN(value) ? undefined : value
    }));
  };

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [name]: isNaN(numValue) ? 0 : numValue
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Позиция</Label>
          <Select
            value={formData.position}
            onValueChange={(value: PlayerPosition) => setFormData(prev => ({ ...prev, position: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите позицию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="goalkeeper">Вратарь</SelectItem>
              <SelectItem value="defender">Защитник</SelectItem>
              <SelectItem value="midfielder">Полузащитник</SelectItem>
              <SelectItem value="forward">Нападающий</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="number">Номер</Label>
          <Input
            id="number"
            name="number"
            type="number"
            value={formData.number || ''}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Дата рождения</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Рост (см)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={formData.height || ''}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <Label htmlFor="weight">Вес (кг)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight || ''}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="preferredFoot">Предпочитаемая нога</Label>
        <Select
          value={formData.preferredFoot}
          onValueChange={(value: PreferredFoot) => setFormData(prev => ({ ...prev, preferredFoot: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите ногу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Левая</SelectItem>
            <SelectItem value="right">Правая</SelectItem>
            <SelectItem value="both">Обе</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="biography">Биография</Label>
        <Input
          id="biography"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="image">URL изображения</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="contractEndDate">Дата окончания контракта</Label>
        <Input
          id="contractEndDate"
          name="contractEndDate"
          type="date"
          value={formData.contractEndDate}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Статистика</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="appearances">Игры</Label>
            <Input
              id="appearances"
              name="appearances"
              type="number"
              value={formData.stats?.appearances || 0}
              onChange={handleStatsChange}
            />
          </div>
          <div>
            <Label htmlFor="goals">Голы</Label>
            <Input
              id="goals"
              name="goals"
              type="number"
              value={formData.stats?.goals || 0}
              onChange={handleStatsChange}
            />
          </div>
          <div>
            <Label htmlFor="assists">Передачи</Label>
            <Input
              id="assists"
              name="assists"
              type="number"
              value={formData.stats?.assists || 0}
              onChange={handleStatsChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          {player ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </form>
  );
}; 