import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Users, Trophy, Settings, LogOut, Users2, Shield, Newspaper, Image, Calendar, User, RefreshCw } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { logout, admin, sharedData, syncData, updateSharedData } = useAuth();
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = React.useState(false);

  useEffect(() => {
    const syncInterval = setInterval(async () => {
      try {
        await syncData();
      } catch (error) {
        console.error('Error syncing data:', error);
      }
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(syncInterval);
  }, [syncData]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncData();
      toast({
        title: 'Данные синхронизированы',
        description: 'Все изменения успешно обновлены',
      });
    } catch (error) {
      toast({
        title: 'Ошибка синхронизации',
        description: 'Не удалось синхронизировать данные',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-fc-darkGreen to-fc-green shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-white mr-2" />
              <span className="text-white font-bold text-xl">ФК Гудаута Админ</span>
            </div>
            <div className="flex items-center gap-4">
              {admin && (
                <div className="flex items-center text-white">
                  <User className="w-5 h-5 mr-2" />
                  <span>{admin.username}</span>
                </div>
              )}
              <Button
                variant="ghost"
                onClick={handleSync}
                disabled={isSyncing}
                className="text-white hover:text-gray-200 text-sm flex items-center bg-white/10 px-4 py-2 rounded-full transition-all hover:bg-white/20"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Синхронизация...' : 'Синхронизировать'}</span>
              </Button>
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 text-sm flex items-center bg-white/10 px-4 py-2 rounded-full transition-all hover:bg-white/20"
              >
                <span>Вернуться на сайт</span>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hover:text-gray-200 text-sm flex items-center bg-white/10 px-4 py-2 rounded-full transition-all hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-lg rounded-tr-xl rounded-br-xl overflow-hidden m-4 mr-0">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Панель управления</h2>
            {sharedData && (
              <p className="text-sm text-gray-500 mt-1">
                Последнее обновление: {new Date(sharedData.lastUpdated).toLocaleString()}
              </p>
            )}
          </div>
          <nav className="p-4">
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 pl-4">Основное</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/admin"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Settings className="mr-3 h-5 w-5 text-fc-green" />
                    Обзор
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/teams"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Shield className="mr-3 h-5 w-5 text-fc-green" />
                    Команды
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/news"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Newspaper className="mr-3 h-5 w-5 text-fc-green" />
                    Новости
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/matches"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Calendar className="mr-3 h-5 w-5 text-fc-green" />
                    Матчи
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/media"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Image className="mr-3 h-5 w-5 text-fc-green" />
                    Медиа
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 pl-4">ФК Гудаута</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/admin/players?team=gudauta"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Users className="mr-3 h-5 w-5 text-fc-green" />
                    Игроки
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/coaches?team=gudauta"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-green/10 hover:to-fc-lightGreen/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Users2 className="mr-3 h-5 w-5 text-fc-green" />
                    Тренеры
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 pl-4">СШ Гудаута</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/admin/players?team=gudauta-school"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-400/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Users className="mr-3 h-5 w-5 text-blue-500" />
                    Игроки школы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/coaches?team=gudauta-school"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-400/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Users2 className="mr-3 h-5 w-5 text-blue-500" />
                    Тренеры школы
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 pl-4">Соревнования</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/admin/tournaments"
                    className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-fc-yellow/10 hover:to-amber-400/10 text-gray-700 font-medium flex items-center transition-all"
                  >
                    <Trophy className="mr-3 h-5 w-5 text-fc-yellow" />
                    Турниры
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
