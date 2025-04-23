import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Players from './pages/Players';
import Matches from './pages/Matches';
import News from './pages/News';
import PlayersManagement from './pages/admin/PlayersManagement';
import MatchesManagement from './pages/admin/MatchesManagement';
import NewsManagement from './pages/admin/NewsManagement';
import { AuthProvider } from './lib/auth-context';

const About = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">О клубе</h1>
    <p className="text-lg mb-4">
      Футбольный клуб "Гудаута" - профессиональный футбольный клуб из города Гудаута, Абхазия.
    </p>
  </div>
);

const Admin = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a href="#/admin/players" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Управление игроками</h2>
        <p className="text-gray-600">Добавление, редактирование и удаление игроков команды</p>
      </a>
      <a href="#/admin/matches" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Управление матчами</h2>
        <p className="text-gray-600">Добавление, редактирование и удаление матчей</p>
      </a>
      <a href="#/admin/news" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Управление новостями</h2>
        <p className="text-gray-600">Добавление, редактирование и удаление новостей</p>
      </a>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/players" element={<PlayersManagement />} />
            <Route path="/admin/matches" element={<MatchesManagement />} />
            <Route path="/admin/news" element={<NewsManagement />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
