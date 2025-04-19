import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Trophy, Edit, Trash, Clock, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useMatches, Match } from '@/hooks/useMatches';

const MatchesManagement: React.FC = () => {
  const { matches, addMatch, updateMatch, deleteMatch, isLoading } = useMatches();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [formData, setFormData] = useState<Partial<Match>>({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    venue: '',
    competition: '',
    status: 'scheduled',
    score: { home: 0, away: 0 }
  });

  useEffect(() => {
    if (editingMatch) {
      setFormData({
        ...editingMatch,
        score: editingMatch.score || { home: 0, away: 0 }
      });
    } else {
      setFormData({
        homeTeam: '',
        awayTeam: '',
        date: '',
        time: '',
        venue: '',
        competition: '',
        status: 'scheduled',
        score: { home: 0, away: 0 }
      });
    }
  }, [editingMatch]);

  const handleOpenDialog = (match?: Match) => {
    if (match) {
      setEditingMatch(match);
    } else {
      setEditingMatch(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingMatch(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value as Match['status'] }));
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>, team: 'home' | 'away') => {
    const value = parseInt(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      score: { ...(prev.score || { home: 0, away: 0 }), [team]: value }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.homeTeam || !formData.awayTeam || !formData.date || !formData.time || !formData.venue || !formData.competition) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, заполните все обязательные поля",
          variant: "destructive",
        });
        return;
      }

      const matchData: Match = {
        id: editingMatch?.id || Date.now().toString(),
        homeTeam: formData.homeTeam,
        awayTeam: formData.awayTeam,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        competition: formData.competition,
        status: formData.status as Match['status'],
        score: formData.status === 'finished' ? formData.score : undefined
      };

      if (editingMatch) {
        updateMatch(matchData);
        toast({
          title: "Успех",
          description: "Матч успешно обновлен",
        });
      } else {
        addMatch(matchData);
        toast({
          title: "Успех",
          description: "Матч успешно добавлен",
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving match:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении матча",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (matchId: string) => {
    try {
      deleteMatch(matchId);
      toast({
        title: "Успех",
        description: "Матч успешно удален",
      });
    } catch (error) {
      console.error('Error deleting match:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при удалении матча",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление матчами</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить матч
        </Button>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{match.homeTeam} vs {match.awayTeam}</h3>
                <p className="text-sm text-gray-500">
                  <Calendar className="inline-block h-4 w-4 mr-1" />
                  {match.date} <Clock className="inline-block h-4 w-4 mr-1" />
                  {match.time}
                </p>
                <p className="text-sm text-gray-500">
                  <Trophy className="inline-block h-4 w-4 mr-1" />
                  {match.competition}
                  <MapPin className="inline-block h-4 w-4 mr-1 ml-2" />
                  {match.venue}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenDialog(match)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(match.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMatch ? 'Редактировать матч' : 'Добавить матч'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="homeTeam" className="text-sm font-medium">Хозяева</label>
              <Input
                id="homeTeam"
                name="homeTeam"
                value={formData.homeTeam}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="awayTeam" className="text-sm font-medium">Гости</label>
              <Input
                id="awayTeam"
                name="awayTeam"
                value={formData.awayTeam}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Дата</label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">Время</label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="venue" className="text-sm font-medium">Место проведения</label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="competition" className="text-sm font-medium">Соревнование</label>
              <Input
                id="competition"
                name="competition"
                value={formData.competition}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Статус</label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Запланирован</SelectItem>
                  <SelectItem value="live">В прямом эфире</SelectItem>
                  <SelectItem value="finished">Завершен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.status === 'finished' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Счет</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={formData.score?.home || 0}
                    onChange={(e) => handleScoreChange(e, 'home')}
                    required
                  />
                  <span className="flex items-center">-</span>
                  <Input
                    type="number"
                    min="0"
                    value={formData.score?.away || 0}
                    onChange={(e) => handleScoreChange(e, 'away')}
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchesManagement;