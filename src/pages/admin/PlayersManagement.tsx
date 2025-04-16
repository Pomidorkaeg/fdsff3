
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

const PlayersManagement = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('team') || 'gudauta';
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const team = getTeamById(teamId);
  
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
      deletePlayer(confirmDelete);
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
        updatePlayer(updatedPlayer);
        setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
        toast({
          title: "Игрок обновлен",
          description: "Информация об игроке успешно обновлена",
        });
      } else {
        // Create new player
        createPlayer(updatedPlayer);
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
    </div>
  );
};

export default PlayersManagement;
