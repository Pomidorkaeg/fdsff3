
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Team } from '@/types/team';

interface CoachesManagementHeaderProps {
  team: Team | undefined;
  onAddNew: () => void;
}

const CoachesManagementHeader: React.FC<CoachesManagementHeaderProps> = ({ team, onAddNew }) => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
              style={{ backgroundColor: team?.primaryColor || '#2e7d32' }}
            >
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span>Управление тренерами: {team?.name || 'Команда'}</span>
          </div>
        </CardTitle>
        <Button onClick={onAddNew} className="bg-fc-green hover:bg-fc-darkGreen">
          <Plus className="mr-2 h-4 w-4" /> Добавить тренера
        </Button>
      </CardHeader>
    </Card>
  );
};

export default CoachesManagementHeader;
