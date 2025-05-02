import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlayerEditor from '@/pages/admin/PlayerEditor';
import { getPlayersByTeam, updatePlayer, deletePlayer, createPlayer } from '@/utils/players';
import { getTeamById } from '@/utils/teamsData';
import { Player } from '@/types/player';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import PlayerManagementHeader from '@/components/admin/players/PlayerManagementHeader';
import SearchBar from '@/components/admin/players/SearchBar';
import PlayersList from '@/components/admin/players/PlayersList';
import { usePlayers } from '@/hooks/usePlayers';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { PlayerCard } from '@/components/players/PlayerCard';

const PlayersManagement = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('team') || 'gudauta';
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const team = getTeamById(teamId);
  
  const { players: hookPlayers, loading, error, createPlayer: hookCreatePlayer, editPlayer: hookEditPlayer, removePlayer: hookRemovePlayer } = usePlayers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Player>>({
    firstName: '',
    lastName: '',
    position: '',
    number: undefined,
    dateOfBirth: '',
    nationality: '',
    height: undefined,
    weight: undefined,
    preferredFoot: '',
    biography: '',
    image: '',
    contractEndDate: '',
    isActive: true
  });

  useEffect(() => {
    // Load players for the selected team
    const teamPlayers = getPlayersByTeam(teamId);
    setPlayers(teamPlayers);
  }, [teamId]);

  const handleEdit = (player: Player) => {
    setCurrentPlayer(player);
    setEditMode(true);
  };

  const handleConfirmDelete = (playerId: string) => {
    setConfirmDelete(playerId);
  };

  const handleDeleteConfirmed = () => {
    if (!confirmDelete) return;
    
    try {
      hookRemovePlayer(confirmDelete);
      setPlayers(players.filter(p => p.id !== confirmDelete));
      toast({
        title: "Игрок удален",
        description: "Игрок был успешно удален из системы",
      });
      setConfirmDelete(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить игрока",
      });
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleAddNew = () => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: '',
      position: 'Нападающий',
      number: players.length + 1,
      birthDate: '',
      height: 180,
      weight: 75,
      nationality: 'Россия',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      matches: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      teamId: teamId
    };
    setCurrentPlayer(newPlayer);
    setEditMode(true);
  };

  const handleSave = (updatedPlayer: Player) => {
    try {
      if (players.some(p => p.id === updatedPlayer.id)) {
        // Update existing player
        hookEditPlayer(updatedPlayer.id, formData);
        setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
        toast({
          title: "Игрок обновлен",
          description: "Информация об игроке успешно обновлена",
        });
      } else {
        // Create new player
        hookCreatePlayer(formData as Omit<Player, 'id'>);
        setPlayers([...players, updatedPlayer]);
        toast({
          title: "Игрок добавлен",
          description: "Новый игрок успешно добавлен в систему",
        });
      }
      setEditMode(false);
      setCurrentPlayer(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentPlayer(null);
  };

  const handleOpenDialog = (player?: Player) => {
    if (player) {
      setCurrentPlayer(player);
      setFormData(player);
    } else {
      setCurrentPlayer(null);
      setFormData({
        firstName: '',
        lastName: '',
        position: '',
        number: undefined,
        dateOfBirth: '',
        nationality: '',
        height: undefined,
        weight: undefined,
        preferredFoot: '',
        biography: '',
        image: '',
        contractEndDate: '',
        isActive: true
      });
    }
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditMode(false);
    setCurrentPlayer(null);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentPlayer) {
        await handleSave(currentPlayer);
      } else {
        await handleSave(formData as Player);
      }
    } catch (err) {
      console.error('Error saving player:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await hookRemovePlayer(id);
    } catch (err) {
      console.error('Error deleting player:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <PlayerManagementHeader 
        teamName={team?.name || 'Команда'} 
        primaryColor={team?.primaryColor || '#2e7d32'} 
        onAddNew={handleAddNew} 
      />
      
      {editMode && currentPlayer ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {currentPlayer.id.includes('player-') && !players.some(p => p.id === currentPlayer.id) 
                ? 'Добавить нового игрока' 
                : 'Редактировать игрока'
              }
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Отмена
              </Button>
            </div>
          </div>
          
          <PlayerEditor 
            player={currentPlayer} 
            onSave={handleSave} 
            onCancel={handleCancel} 
          />
        </div>
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <PlayersList 
            players={players}
            searchTerm={searchTerm}
            primaryColor={team?.primaryColor || '#2e7d32'}
            onEdit={handleEdit}
            onDelete={handleConfirmDelete}
          />
        </>
      )}

      {/* Confirmation Dialog for Delete */}
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этого игрока? Это действие нельзя будет отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>Отмена</Button>
            <Button variant="destructive" onClick={handleDeleteConfirmed}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-2xl font-bold">Добавить нового игрока</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить игрока
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentPlayer ? 'Редактировать игрока' : 'Добавить игрока'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Позиция</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Номер</Label>
                  <Input
                    id="number"
                    name="number"
                    type="number"
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Дата рождения</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Национальность</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Рост (см)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredFoot">Предпочитаемая нога</Label>
                  <Input
                    id="preferredFoot"
                    name="preferredFoot"
                    value={formData.preferredFoot}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractEndDate">Дата окончания контракта</Label>
                  <Input
                    id="contractEndDate"
                    name="contractEndDate"
                    type="date"
                    value={formData.contractEndDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL изображения</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="biography">Биография</Label>
                <Input
                  id="biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Отмена
                </Button>
                <Button type="submit">
                  {currentPlayer ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {hookPlayers.map(player => (
          <div key={player.id} className="relative group">
            <PlayerCard player={player} />
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleOpenDialog(player)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(player.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersManagement;
