import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ФК Гудаута</h3>
            <p className="text-gray-400">
              Официальный сайт футбольного клуба Гудаута
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/matches" className="text-gray-400 hover:text-white">
                  Матчи
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-gray-400 hover:text-white">
                  Команды
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/players" className="text-gray-400 hover:text-white">
                  Игроки
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>г. Гудаута</li>
              <li>Email: info@fcgudauta.ru</li>
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ФК Гудаута. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 