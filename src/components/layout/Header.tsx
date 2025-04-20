import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-fc-green">
            ФК Гудаута
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/matches" className="text-gray-600 hover:text-fc-green">
              Матчи
            </Link>
            <Link to="/teams" className="text-gray-600 hover:text-fc-green">
              Команды
            </Link>
            <Link to="/news" className="text-gray-600 hover:text-fc-green">
              Новости
            </Link>
            <Link to="/players" className="text-gray-600 hover:text-fc-green">
              Игроки
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/admin/login">Вход</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 