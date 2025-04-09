
import React from 'react';
import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface PlayerManagementHeaderProps {
  teamName: string;
  primaryColor: string;
  onAddNew: () => void;
}

const PlayerManagementHeader: React.FC<PlayerManagementHeaderProps> = ({ 
  teamName, 
  primaryColor, 
  onAddNew 
}) => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
              style={{ backgroundColor: primaryColor || '#2e7d32' }}
            >
              <User className="h-4 w-4 text-white" />
            </div>
            <span>Управление игроками: {teamName}</span>
          </div>
        </CardTitle>
        <Button onClick={onAddNew} className="bg-fc-green hover:bg-fc-darkGreen">
          <Plus className="mr-2 h-4 w-4" /> Добавить игрока
        </Button>
      </CardHeader>
    </Card>
  );
};

export default PlayerManagementHeader;
