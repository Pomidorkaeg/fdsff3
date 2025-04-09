
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
import StaffSection from '@/components/team/StaffSection';

const Team = () => {
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
            <PlayersSection
              players={players}
              activePosition={activePosition}
              selectedPlayer={selectedPlayer}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onPositionChange={setActivePosition}
              onPlayerSelect={handlePlayerClick}
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
