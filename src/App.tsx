import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/lib/auth-context';
import { SiteProvider } from '@/lib/site-context';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Matches from '@/pages/Matches';
import Teams from '@/pages/Teams';
import News from '@/pages/News';
import Players from '@/pages/Players';
import Login from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';
import MatchesManagement from '@/pages/admin/MatchesManagement';
import TeamsManagement from '@/pages/admin/TeamsManagement';
import NewsManagement from '@/pages/admin/NewsManagement';
import PlayersManagement from '@/pages/admin/PlayersManagement';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SiteProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="matches" element={<Matches />} />
              <Route path="teams" element={<Teams />} />
              <Route path="news" element={<News />} />
              <Route path="players" element={<Players />} />
              <Route path="admin/login" element={<Login />} />
              <Route path="admin" element={<Dashboard />} />
              <Route path="admin/matches" element={<MatchesManagement />} />
              <Route path="admin/teams" element={<TeamsManagement />} />
              <Route path="admin/news" element={<NewsManagement />} />
              <Route path="admin/players" element={<PlayersManagement />} />
            </Route>
          </Routes>
        </SiteProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
