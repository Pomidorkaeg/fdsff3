import React, { useState, useEffect } from 'react';
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
      setFormData(editingMatch);
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
      score: { ...prev.score, [team]: value }
    }));
  };

  const handleSave = () => {
    try {
      if (editingMatch) {
        const updatedMatch = { ...formData, id: editingMatch.id } as Match;
        updateMatch(updatedMatch);
        toast({
          title: "Матч обновлен",
          description: "Матч успешно обновлен",
        });
      } else {
        const newMatch = { ...formData, id: Date.now().toString() } as Match;
        addMatch(newMatch);
        toast({
          title: "Матч добавлен",
          description: "Новый матч успешно добавлен",
        });
      }
      handleCloseDialog();
    } catch (error) {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Управление матчами</h1>
        <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Добавить матч
        </Button>
      </div>

      <div className="grid gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
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
                  <span className="text-sm sm:text-base">{match.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{match.time}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(match)}
                  className="w-full sm:w-auto"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(match.id)}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="flex-1 text-center sm:text-left">
                <div className="text-base sm:text-lg font-semibold">{match.homeTeam}</div>
              </div>
              <div className="flex items-center gap-3">
                {match.status !== 'scheduled' && match.score && (
                  <div className="text-xl sm:text-2xl font-bold">
                    {match.score.home} - {match.score.away}
                  </div>
                )}
                {match.status === 'scheduled' && (
                  <div className="text-lg sm:text-xl font-bold">vs</div>
                )}
              </div>
              <div className="flex-1 text-center sm:text-right">
                <div className="text-base sm:text-lg font-semibold">{match.awayTeam}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{match.competition}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{match.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingMatch ? 'Редактировать матч' : 'Добавить матч'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="homeTeam" className="text-sm font-medium">Хозяева</label>
                <Input
                  id="homeTeam"
                  name="homeTeam"
                  value={formData.homeTeam}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="awayTeam" className="text-sm font-medium">Гости</label>
                <Input
                  id="awayTeam"
                  name="awayTeam"
                  value={formData.awayTeam}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Дата</label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full"
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
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="venue" className="text-sm font-medium">Место проведения</label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="competition" className="text-sm font-medium">Турнир</label>
              <Input
                id="competition"
                name="competition"
                value={formData.competition}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Статус</label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Запланирован</SelectItem>
                  <SelectItem value="live">Идет матч</SelectItem>
                  <SelectItem value="finished">Завершен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.status !== 'scheduled' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="homeScore" className="text-sm font-medium">Счет хозяев</label>
                  <Input
                    id="homeScore"
                    type="number"
                    value={formData.score?.home}
                    onChange={(e) => handleScoreChange(e, 'home')}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="awayScore" className="text-sm font-medium">Счет гостей</label>
                  <Input
                    id="awayScore"
                    type="number"
                    value={formData.score?.away}
                    onChange={(e) => handleScoreChange(e, 'away')}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Отмена</Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchesManagement;