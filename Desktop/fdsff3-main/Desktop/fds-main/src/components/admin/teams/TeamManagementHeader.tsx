
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const TeamManagementHeader: React.FC = () => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-fc-green" />
          Управление командами
        </CardTitle>
        <CardDescription>
          Настройка информации о командах клуба
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TeamManagementHeader;
