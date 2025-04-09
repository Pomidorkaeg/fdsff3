
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCoachesByTeam, getCoachById, updateCoach, deleteCoach, createCoach } from '@/utils/coaches';
import { getTeamById } from '@/utils/teamsData';
import { Coach } from '@/types/coach';
import { toast } from '@/components/ui/use-toast';

// Import our new components
import CoachesManagementHeader from '@/components/admin/coaches/CoachesManagementHeader';
import CoachesSearchBar from '@/components/admin/coaches/CoachesSearchBar';
import CoachesGrid from '@/components/admin/coaches/CoachesGrid';
import CoachesEditorWrapper from '@/components/admin/coaches/CoachesEditorWrapper';

const CoachesManagement = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('team') || 'gudauta';
  
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentCoach, setCurrentCoach] = useState<Coach | null>(null);
  
  const team = getTeamById(teamId);
  
  useEffect(() => {
    // Load coaches for the selected team
    const teamCoaches = getCoachesByTeam(teamId);
    setCoaches(teamCoaches);
  }, [teamId]);
  
  const filteredCoaches = coaches.filter(coach => 
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEdit = (coach: Coach) => {
    setCurrentCoach(coach);
    setEditMode(true);
  };
  
  const handleDelete = (coachId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого тренера?')) {
      try {
        deleteCoach(coachId);
        setCoaches(coaches.filter(c => c.id !== coachId));
        toast({
          title: "Тренер удален",
          description: "Тренер был успешно удален из системы",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось удалить тренера",
        });
      }
    }
  };
  
  const handleAddNew = () => {
    const newCoach: Coach = {
      id: `coach-${Date.now()}`,
      name: '',
      role: 'Тренер',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      since: new Date().getFullYear().toString(),
      experience: 0,
      biography: '',
      teamId: teamId
    };
    setCurrentCoach(newCoach);
    setEditMode(true);
  };
  
  const handleSave = (updatedCoach: Coach) => {
    try {
      if (coaches.some(c => c.id === updatedCoach.id)) {
        // Update existing coach
        updateCoach(updatedCoach);
        setCoaches(coaches.map(c => c.id === updatedCoach.id ? updatedCoach : c));
        toast({
          title: "Тренер обновлен",
          description: "Информация о тренере успешно обновлена",
        });
      } else {
        // Create new coach
        createCoach(updatedCoach);
        setCoaches([...coaches, updatedCoach]);
        toast({
          title: "Тренер добавлен",
          description: "Новый тренер успешно добавлен в систему",
        });
      }
      setEditMode(false);
      setCurrentCoach(null);
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
    setCurrentCoach(null);
  };
  
  return (
    <div>
      <CoachesManagementHeader 
        team={team} 
        onAddNew={handleAddNew} 
      />
      
      {editMode && currentCoach ? (
        <CoachesEditorWrapper 
          currentCoach={currentCoach}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <CoachesSearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <CoachesGrid 
            coaches={filteredCoaches}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default CoachesManagement;
