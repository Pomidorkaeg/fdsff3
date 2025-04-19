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

  const handleSave = () => {
    try {
      if (!formData.homeTeam || !formData.awayTeam || !formData.date || !formData.time) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, заполните все обязательные поля",
          variant: "destructive",
        });
        return;
      }

      if (editingMatch) {
        const updatedMatch = { 
          ...formData, 
          id: editingMatch.id,
          score: formData.status === 'scheduled' ? undefined : formData.score
        } as Match;
        updateMatch(updatedMatch);
        toast({
          title: "Матч обновлен",
          description: "Матч успешно обновлен",
        });
      } else {
        const newMatch = { 
          ...formData, 
          id: Date.now().toString(),
          score: formData.status === 'scheduled' ? undefined : formData.score
        } as Match;
        addMatch(newMatch);
        toast({
          title: "Матч добавлен",
          description: "Новый матч успешно добавлен",
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
        title: "Матч удален",
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fc-green"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление матчами</h1>
        <Button onClick={() => setEditingMatch(null)}>
          Добавить матч
        </Button>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <div key={match.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{match.homeTeam} vs {match.awayTeam}</h3>
                <p className="text-sm text-gray-500">
                  {match.date} {match.time} • {match.venue}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingMatch(match)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMatch(match.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingMatch} onOpenChange={() => setEditingMatch(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMatch?.id ? 'Редактировать матч' : 'Добавить матч'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homeTeam">Хозяева</Label>
              <Input
                id="homeTeam"
                value={formData.homeTeam}
                onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="awayTeam">Гости</Label>
              <Input
                id="awayTeam"
                value={formData.awayTeam}
                onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Время</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Место проведения</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition">Соревнование</Label>
              <Input
                id="competition"
                value={formData.competition}
                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Match['status'] })}
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
                <Label>Счет</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={formData.score?.home || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      score: { ...formData.score, home: parseInt(e.target.value) }
                    })}
                    required
                  />
                  <span className="flex items-center">-</span>
                  <Input
                    type="number"
                    min="0"
                    value={formData.score?.away || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      score: { ...formData.score, away: parseInt(e.target.value) }
                    })}
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