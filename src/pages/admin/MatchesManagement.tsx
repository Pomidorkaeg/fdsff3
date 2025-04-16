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

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'live' | 'finished';
  score?: {
    home: number;
    away: number;
  };
}

const MatchesManagement = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Load matches from storage on component mount
  React.useEffect(() => {
    const loadedMatches = localStorage.getItem('matches');
    if (loadedMatches) {
      setMatches(JSON.parse(loadedMatches));
    }
  }, []);

  const handleAddNew = () => {
    const newMatch: Match = {
      id: Date.now().toString(),
      homeTeam: '',
      awayTeam: '',
      date: '',
      time: '',
      venue: '',
      competition: '',
      status: 'scheduled'
    };
    setCurrentMatch(newMatch);
    setEditMode(true);
  };

  const handleEdit = (match: Match) => {
    setCurrentMatch(match);
    setEditMode(true);
  };

  const handleSave = (match: Match) => {
    if (match.id) {
      setMatches(prev => {
        const updated = prev.map(m => m.id === match.id ? match : m);
        localStorage.setItem('matches', JSON.stringify(updated));
        return updated;
      });
    } else {
      setMatches(prev => {
        const updated = [...prev, { ...match, id: Date.now().toString() }];
        localStorage.setItem('matches', JSON.stringify(updated));
        return updated;
      });
    }
    setEditMode(false);
    setCurrentMatch(null);
    toast({
      title: "Успешно сохранено",
      description: "Матч был успешно сохранен",
    });
  };

  const handleDelete = (id: string) => {
    setMatches(prev => {
      const updated = prev.filter(match => match.id !== id);
      localStorage.setItem('matches', JSON.stringify(updated));
      return updated;
    });
    setConfirmDelete(null);
    toast({
      title: "Удалено",
      description: "Матч был успешно удален",
      variant: "destructive"
    });
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
                  onClick={() => setConfirmDelete(match.id)}
                  className="text-fc-red hover:text-fc-red/80"
                >
                  <Trash className="h-4 w-4 mr-1" /> Удалить
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editMode && currentMatch && (
        <Dialog open={editMode} onOpenChange={() => setEditMode(false)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {currentMatch.id ? 'Редактировать матч' : 'Добавить новый матч'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="homeTeam">Домашняя команда</Label>
                  <Input
                    id="homeTeam"
                    value={currentMatch.homeTeam}
                    onChange={(e) => setCurrentMatch({ ...currentMatch, homeTeam: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="awayTeam">Гостевая команда</Label>
                  <Input
                    id="awayTeam"
                    value={currentMatch.awayTeam}
                    onChange={(e) => setCurrentMatch({ ...currentMatch, awayTeam: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentMatch.date}
                    onChange={(e) => setCurrentMatch({ ...currentMatch, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Время</Label>
                  <Input
                    id="time"
                    type="time"
                    value={currentMatch.time}
                    onChange={(e) => setCurrentMatch({ ...currentMatch, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="venue">Стадион</Label>
                <Input
                  id="venue"
                  value={currentMatch.venue}
                  onChange={(e) => setCurrentMatch({ ...currentMatch, venue: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="competition">Соревнование</Label>
                <Input
                  id="competition"
                  value={currentMatch.competition}
                  onChange={(e) => setCurrentMatch({ ...currentMatch, competition: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Статус матча</Label>
                <Select
                  value={currentMatch.status}
                  onValueChange={(value: 'scheduled' | 'live' | 'finished') => 
                    setCurrentMatch({ ...currentMatch, status: value })}
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

              {currentMatch.status !== 'scheduled' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="scoreHome">Голы (хозяева)</Label>
                    <Input
                      id="scoreHome"
                      type="number"
                      min="0"
                      value={currentMatch.score?.home || 0}
                      onChange={(e) => setCurrentMatch({
                        ...currentMatch,
                        score: {
                          ...currentMatch.score,
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
                      value={currentMatch.score?.away || 0}
                      onChange={(e) => setCurrentMatch({
                        ...currentMatch,
                        score: {
                          ...currentMatch.score,
                          away: parseInt(e.target.value) || 0
                        }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Отмена
              </Button>
              <Button 
                onClick={() => handleSave(currentMatch)}
                className="bg-fc-green hover:bg-fc-darkGreen"
              >
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердите удаление</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этот матч? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && handleDelete(confirmDelete)}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchesManagement;