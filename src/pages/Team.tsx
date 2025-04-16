import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Player } from '@/types/player';
import { Coach } from '@/types/coach';
import { Team as TeamType } from '@/types/team';
import { getTeamsData } from '@/utils/teamsData';
import { getPlayersByTeam } from '@/utils/players';
import { getCoachesByTeam } from '@/utils/coachesData';
import TeamDetail from '@/components/TeamDetail';
import TeamHeader from '@/components/team/TeamHeader';
import TeamTabs from '@/components/team/TeamTabs';
import PlayersSection from '@/components/team/PlayersSection';
import PlayerStatistics from '@/components/team/PlayerStatistics';
import StaffSection from '@/components/team/StaffSection';

const Team = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [activePosition, setActivePosition] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTeam, setActiveTeam] = useState<string>('gudauta');
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [staff, setStaff] = useState<Coach[]>([]);
  
  useEffect(() => {
    // Load teams data
    const teamsData = getTeamsData();
    setTeams(teamsData);
  }, []);
  
  useEffect(() => {
    // Update players and staff when active team changes
    if (activeTeam) {
      const teamPlayers = getPlayersByTeam(activeTeam);
      const teamStaff = getCoachesByTeam(activeTeam);
      
      setPlayers(teamPlayers);
      setStaff(teamStaff);
      setSelectedPlayer(null);
      setActivePosition('all');
    }
  }, [activeTeam]);
  
  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleTeamChange = (teamId: string) => {
    setActiveTeam(teamId);
    setActiveTab('details'); // Reset to details tab when switching teams
  };

  const handleManagePlayers = () => {
    navigate(`/admin/players?team=${activeTeam}`);
  };

  // Find current team 
  const currentTeam = teams.find(team => team.id === activeTeam);
  
  // Default colors if team not found
  const primaryColor = currentTeam?.primaryColor || '#2e7d32';
  const secondaryColor = currentTeam?.secondaryColor || '#ffeb3b';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 page-transition">
        {/* Header */}
        <TeamHeader 
          teams={teams} 
          activeTeam={activeTeam} 
          onTeamChange={handleTeamChange}
          primaryColor={primaryColor}
        />
        
        {/* Tab Navigation */}
        <TeamTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          primaryColor={primaryColor} 
        />
        
        {/* Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {activeTab === 'details' && currentTeam && (
            <TeamDetail team={currentTeam} />
          )}
          
          {activeTab === 'players' && (
            <>
              <div className="flex justify-end mb-4">
                <Button 
                  variant="outline" 
                  onClick={handleManagePlayers} 
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Управление игроками
                </Button>
              </div>
              <PlayersSection
                players={players}
                activePosition={activePosition}
                selectedPlayer={selectedPlayer}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onPositionChange={setActivePosition}
                onPlayerSelect={handlePlayerClick}
              />
            </>
          )}

          {activeTab === 'statistics' && (
            <PlayerStatistics 
              players={players}
              primaryColor={primaryColor}
            />
          )}
          
          {activeTab === 'staff' && (
            <StaffSection 
              staff={staff} 
              primaryColor={primaryColor} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;
