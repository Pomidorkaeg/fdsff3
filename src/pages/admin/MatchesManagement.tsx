import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Trophy, Pencil, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Label } from '@/components/ui/label';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/hooks/useMatches';

const MatchesManagement: React.FC = () => {
  const { matches, addMatch, updateMatch, deleteMatch } = useMatches();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [formData, setFormData] = useState<Partial<Match>>({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    competition: '',
    venue: '',
    score: { home: 0, away: 0 }
  });

  const handleAddNew = () => {
    setEditingMatch(null);
    setFormData({
      homeTeam: '',
      awayTeam: '',
      date: '',
      time: '',
      competition: '',
      venue: '',
      score: { home: 0, away: 0 }
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (match: Match) => {
    setEditingMatch(match);
    setFormData(match);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.homeTeam || !formData.awayTeam || !formData.date || !formData.time) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingMatch) {
        const updatedMatch: Match = {
          ...formData,
          id: editingMatch.id
        } as Match;
        updateMatch(updatedMatch);
        toast({
          title: "Успех",
          description: "Матч успешно обновлен"
        });
      } else {
        addMatch(formData as Match);
        toast({
          title: "Успех",
          description: "Матч успешно добавлен"
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении матча",
        variant: "destructive"
      });
    }
  };

  const handleDelete = (matchId: string) => {
    try {
      deleteMatch(matchId);
      toast({
        title: "Успех",
        description: "Матч успешно удален"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при удалении матча",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Управление матчами</h1>
        <Button onClick={handleAddNew} className="bg-fc-green hover:bg-fc-darkGreen">
          <Plus className="mr-2 h-4 w-4" /> Добавить матч
        </Button>
      </div>

      <div className="grid gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    match.status === 'live' ? 'bg-fc-green text-white' :
                    match.status === 'finished' ? 'bg-gray-200 text-gray-700' :
                    'bg-fc-yellow text-gray-900'
                  }`}>
                    {match.status === 'live' ? 'Идет матч' :
                     match.status === 'finished' ? 'Завершен' :
                     'Запланирован'}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{match.date} {match.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{match.homeTeam}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {match.status !== 'scheduled' && (
                      <div className="text-2xl font-bold">
                        {match.score?.home} - {match.score?.away}
                      </div>
                    )}
                    {match.status === 'scheduled' && (
                      <div className="text-xl font-bold">vs</div>
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-lg font-semibold">{match.awayTeam}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    {match.competition}
                  </div>
                  <div>{match.venue}</div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(match)}
                >
                  <Pencil className="h-4 w-4 mr-1" /> Изменить
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(match.id)}
                  className="text-fc-red hover:text-fc-red/80"
                >
                  <Trash className="h-4 w-4 mr-1" /> Удалить
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingMatch ? 'Редактировать матч' : 'Добавить новый матч'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="homeTeam">Домашняя команда</Label>
                <Input
                  id="homeTeam"
                  value={formData.homeTeam}
                  onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="awayTeam">Гостевая команда</Label>
                <Input
                  id="awayTeam"
                  value={formData.awayTeam}
                  onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Время</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="venue">Стадион</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="competition">Соревнование</Label>
              <Input
                id="competition"
                value={formData.competition}
                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Статус матча</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'scheduled' | 'live' | 'finished') => 
                  setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Запланирован</SelectItem>
                  <SelectItem value="live">Идет матч</SelectItem>
                  <SelectItem value="finished">Завершен</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.status !== 'scheduled' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="scoreHome">Голы (хозяева)</Label>
                  <Input
                    id="scoreHome"
                    type="number"
                    min="0"
                    value={formData.score?.home || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      score: {
                        ...formData.score,
                        home: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="scoreAway">Голы (гости)</Label>
                  <Input
                    id="scoreAway"
                    type="number"
                    min="0"
                    value={formData.score?.away || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      score: {
                        ...formData.score,
                        away: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-fc-green hover:bg-fc-darkGreen"
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchesManagement;