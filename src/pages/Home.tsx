import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать на сайт ФК Гудаута</h1>
        <p className="text-xl text-gray-600">
          Следите за новостями, результатами матчей и информацией о команде
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/matches"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Матчи</h2>
          <p className="text-gray-600">Расписание и результаты матчей</p>
        </Link>

        <Link
          to="/players"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Игроки</h2>
          <p className="text-gray-600">Состав команды</p>
        </Link>

        <Link
          to="/news"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Новости</h2>
          <p className="text-gray-600">Последние новости клуба</p>
        </Link>
      </div>
    </div>
  );
};

export default Home; 