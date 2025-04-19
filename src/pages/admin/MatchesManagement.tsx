import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useMatches } from '@/hooks/useMatches';
import { Match, MatchStatus } from '@/hooks/useMatches';
import { addMatch, updateMatch, deleteMatch, getLocalMatches, saveLocalMatches } from '@/utils/api/matches';
import { Calendar, Clock, MapPin, Trophy, Trash2, Edit2, Plus, AlertCircle } from 'lucide-react';

const MatchesManagement: React.FC = () => {
  const { matches, isLoading, error, setMatches } = useMatches();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Match>>({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    venue: '',
    competition: '',
    status: 'scheduled' as MatchStatus,
    score: { home: 0, away: 0 }
  });
  const { toast } = useToast();

  useEffect(() => {
    if (selectedMatch) {
      setFormData(selectedMatch);
    } else {
      setFormData({
        homeTeam: '',
        awayTeam: '',
        date: '',
        time: '',
        venue: '',
        competition: '',
        status: 'scheduled' as MatchStatus,
        score: { home: 0, away: 0 }
      });
    }
  }, [selectedMatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      score: { ...prev.score!, [name]: parseInt(value) || 0 }
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value as MatchStatus }));
  };

  const handleSave = async () => {
    try {
      if (selectedMatch) {
        const updatedMatch = await updateMatch({ ...selectedMatch, ...formData });
        setMatches(prev => prev.map(m => m.id === updatedMatch.id ? updatedMatch : m));
        toast({
          title: 'Матч обновлен',
          description: 'Изменения успешно сохранены',
        });
      } else {
        const newMatch = await addMatch(formData as Match);
        setMatches(prev => [...prev, newMatch]);
        toast({
          title: 'Матч добавлен',
          description: 'Новый матч успешно создан',
        });
      }
      setIsDialogOpen(false);
      setSelectedMatch(null);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить матч',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (matchId: string) => {
    try {
      await deleteMatch(matchId);
      setMatches(prev => prev.filter(m => m.id !== matchId));
      toast({
        title: 'Матч удален',
        description: 'Матч успешно удален',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить матч',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-fc-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление матчами</h2>
        <Button
          onClick={() => {
            setSelectedMatch(null);
            setIsDialogOpen(true);
          }}
          className="bg-fc-green hover:bg-fc-green/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить матч
        </Button>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    match.status === 'live' ? 'bg-fc-green text-white animate-pulse' :
                    match.status === 'finished' ? 'bg-gray-200 text-gray-700' :
                    'bg-fc-yellow text-gray-900'
                  }`}>
                    {match.status === 'live' ? 'Идет матч' :
                     match.status === 'finished' ? 'Завершен' :
                     'Запланирован'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-lg font-semibold">{match.homeTeam}</div>
                  {match.status !== 'scheduled' && match.score && (
                    <div className="text-xl font-bold">
                      {match.score.home} - {match.score.away}
                    </div>
                  )}
                  {match.status === 'scheduled' && (
                    <div className="text-xl font-bold">vs</div>
                  )}
                  <div className="text-lg font-semibold">{match.awayTeam}</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{match.venue}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{match.competition}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedMatch(match);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(match.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">
              {selectedMatch ? 'Редактировать матч' : 'Добавить матч'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Хозяева</label>
                  <Input
                    name="homeTeam"
                    value={formData.homeTeam}
                    onChange={handleInputChange}
                    placeholder="Название команды"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Гости</label>
                  <Input
                    name="awayTeam"
                    value={formData.awayTeam}
                    onChange={handleInputChange}
                    placeholder="Название команды"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Дата</label>
                  <Input
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="ДД.ММ.ГГГГ"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Время</label>
                  <Input
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="ЧЧ:ММ"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Стадион</label>
                <Input
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Название стадиона"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Турнир</label>
                <Input
                  name="competition"
                  value={formData.competition}
                  onChange={handleInputChange}
                  placeholder="Название турнира"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Статус</label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Запланирован</SelectItem>
                    <SelectItem value="live">Идет матч</SelectItem>
                    <SelectItem value="finished">Завершен</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(formData.status === 'live' || formData.status === 'finished') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Счет хозяев</label>
                    <Input
                      name="home"
                      type="number"
                      value={formData.score?.home}
                      onChange={handleScoreChange}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Счет гостей</label>
                    <Input
                      name="away"
                      type="number"
                      value={formData.score?.away}
                      onChange={handleScoreChange}
                      min="0"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSelectedMatch(null);
                  }}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-fc-green hover:bg-fc-green/90"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MatchesManagement;