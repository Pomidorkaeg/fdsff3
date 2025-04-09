
import React, { useState } from 'react';
import { getTeamsData, updateTeam } from '@/utils/teamsData';
import { Team } from '@/types/team';
import { toast } from '@/components/ui/use-toast';
import TeamManagementHeader from '@/components/admin/teams/TeamManagementHeader';
import TeamCard from '@/components/admin/teams/TeamCard';
import TeamEditorWrapper from '@/components/admin/teams/TeamEditorWrapper';

const TeamsManagement = () => {
  const [teams, setTeams] = useState<Team[]>(getTeamsData());
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Team | null>(null);
  
  const handleEditClick = (team: Team) => {
    setEditingTeamId(team.id);
    setFormData({ ...team });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (formData) {
      if (name.includes('.')) {
        // Handle nested properties (socialLinks)
        const [parent, child] = name.split('.');
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof Team] as object,
            [child]: value
          }
        });
      } else if (name === 'achievements') {
        // Handle achievements array
        setFormData({
          ...formData,
          achievements: value.split('\n').filter(item => item.trim() !== '')
        });
      } else if (name === 'foundedYear') {
        // Handle numeric foundedYear
        setFormData({
          ...formData,
          foundedYear: parseInt(value) || 0
        });
      } else {
        // Handle regular properties
        setFormData({
          ...formData,
          [name]: value
        });
      }
    }
  };
  
  const handleCancel = () => {
    setEditingTeamId(null);
    setFormData(null);
  };
  
  const handleSave = () => {
    if (formData) {
      try {
        updateTeam(formData);
        setTeams(teams.map(team => team.id === formData.id ? formData : team));
        toast({
          title: "Команда обновлена",
          description: "Информация о команде успешно обновлена",
        });
        setEditingTeamId(null);
        setFormData(null);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось сохранить изменения",
        });
      }
    }
  };
  
  return (
    <div>
      <TeamManagementHeader />
      
      <div className="grid grid-cols-1 gap-8">
        {teams.map((team) => (
          <div key={team.id}>
            {editingTeamId === team.id && formData ? (
              <TeamEditorWrapper 
                team={formData} 
                onChange={handleChange}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            ) : (
              <TeamCard team={team} onEdit={handleEditClick} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsManagement;
