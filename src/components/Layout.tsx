import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-800">
              ФК Гудаута
            </Link>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Главная
              </Link>
              <Link to="/players" className="text-gray-600 hover:text-gray-800">
                Игроки
              </Link>
              <Link to="/matches" className="text-gray-600 hover:text-gray-800">
                Матчи
              </Link>
              <Link to="/news" className="text-gray-600 hover:text-gray-800">
                Новости
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                О клубе
              </Link>
              <Link to="/admin" className="text-gray-600 hover:text-gray-800">
                Админ
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white shadow-sm mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} ФК Гудаута. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 