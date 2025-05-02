
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CoachesSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CoachesSearchBar: React.FC<CoachesSearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        className="pl-10"
        placeholder="Поиск тренеров по имени или должности..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default CoachesSearchBar;
