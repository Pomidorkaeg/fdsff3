import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle, Trophy, Calendar, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTournamentTable, TournamentData } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';

interface TournamentTableProps {
  tournamentId: string;
  source: string;
}

const TournamentTable: React.FC<TournamentTableProps> = ({ 
  tournamentId,
  source
}) => {
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('teams');
  const { toast } = useToast();
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getTournamentTable(tournamentId, source);
      setData(result);
      setLoading(false);
    } catch (err) {
      setError('Не удалось загрузить данные турнирной таблицы');
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось загрузить данные турнирной таблицы",
      });
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [tournamentId, source]);
  
  const handleRefresh = () => {
    fetchData();
    toast({
      title: "Обновление данных",
      description: "Данные турнирной таблицы обновляются",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 bg-white/50">
        <div className="animate-spin mb-4">
          <RefreshCw size={32} className="text-fc-green" />
        </div>
        <p className="text-gray-500">Загрузка турнирной таблицы...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center p-6 rounded-xl border border-red-200 bg-red-50">
        <AlertTriangle size={32} className="text-fc-red mb-4" />
        <p className="text-fc-red font-medium mb-2">Ошибка загрузки данных</p>
        <p className="text-gray-500 mb-4 text-center">{error}</p>
        <button 
          onClick={handleRefresh} 
          className="px-4 py-2 bg-fc-green text-white rounded-md flex items-center gap-2 hover:bg-fc-darkGreen transition-colors duration-300"
        >
          <RefreshCw size={16} />
          Повторить попытку
        </button>
      </div>
    );
  }
  
  // Sample data for preview (this would normally come from the API)
  const sampleData: TournamentData = {
    title: "Кубок среди любительских команд МОО СФФ «Сибирь» сезона 2024 года",
    season: "2024",
    lastUpdated: "15.03.2024",
    teams: [
      { position: 1, name: "«Бурятия» (Улан-Удэ)", played: 7, won: 5, drawn: 2, lost: 0, goalsFor: 15, goalsAgainst: 6, goalDifference: 9, points: 17 },
      { position: 2, name: "«Распадская» (Междуреченск)", played: 7, won: 4, drawn: 0, lost: 3, goalsFor: 9, goalsAgainst: 4, goalDifference: 5, points: 12 },
      { position: 3, name: "«Темп» (Барнаул)", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 9, goalsAgainst: 4, goalDifference: 5, points: 11 },
      { position: 4, name: "«Рассвет» (Красноярск)", played: 4, won: 1, drawn: 3, lost: 0, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 6 },
      { position: 5, name: "«Енисей-М» (Красноярск)", played: 6, won: 1, drawn: 3, lost: 2, goalsFor: 7, goalsAgainst: 7, goalDifference: 0, points: 6 },
      { position: 6, name: "«Байкал» (Иркутск)", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 5, goalsAgainst: 6, goalDifference: -1, points: 6 },
      { position: 7, name: "«ТОЦ-Хайра» (Барнаул)", played: 4, won: 1, drawn: 2, lost: 1, goalsFor: 5, goalsAgainst: 6, goalDifference: -1, points: 5 },
      { position: 8, name: "«Восход» Ден-СРФ (Томск)", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 3 },
    ],
    topScorers: [
      { position: 1, name: "Рыбованов Алексей", team: "Бурятия", goals: 5 },
      { position: 2, name: "Бекеровский Андрей", team: "Темп", goals: 4 },
      { position: 3, name: "Винтер Даниил", team: "Рассвет", goals: 3 },
      { position: 4, name: "Савченко Борис", team: "Енисей-М", goals: 3 },
      { position: 5, name: "Бенедиктов Владимир", team: "Байкал", goals: 2 },
    ],
    warnings: [
      { position: 1, name: "Рыбованов Алексей", team: "Бурятия", warnings: 4 },
      { position: 2, name: "Голополобов Евгений", team: "Распадская", warnings: 4 },
      { position: 3, name: "Чуриков Даниил", team: "Енисей-М", warnings: 3 },
      { position: 4, name: "Жариков Роман", team: "Темп", warnings: 2 },
      { position: 5, name: "Голышев Александр", team: "Восход", warnings: 2 },
    ],
    expulsions: [
      { position: 1, name: "Абдуллаев Степан", team: "Енисей-М", expulsions: 1 },
      { position: 2, name: "Воропаев Кирилл", team: "Распадская", expulsions: 1 },
      { position: 3, name: "Яковлев Егор", team: "Темп", expulsions: 1 },
      { position: 4, name: "Пальму Ян", team: "Байкал", expulsions: 1 },
      { position: 5, name: "Шориков Даниил", team: "Восход", expulsions: 1 },
    ]
  };
  
  // Use sample data for preview
  const displayData = data || sampleData;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{displayData.title}</h2>
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <Calendar size={16} />
            <span>Сезон {displayData.season}</span>
            <span className="text-gray-300 mx-2">|</span>
            <span>Обновлено: {displayData.lastUpdated}</span>
          </div>
        </div>
        
        <button 
          onClick={handleRefresh} 
          className="px-4 py-2 bg-fc-green/10 text-fc-green rounded-md flex items-center gap-2 hover:bg-fc-green hover:text-white transition-colors duration-300 ml-auto"
        >
          <RefreshCw size={16} />
          Обновить
        </button>
      </div>
      
      <div className="border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('teams')}
            className={cn(
              "px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors duration-300",
              activeTab === 'teams' 
                ? "text-fc-green border-b-2 border-fc-green" 
                : "text-gray-500 hover:text-fc-green"
            )}
          >
            <Trophy size={16} />
            Таблица команд
          </button>
          
          <button
            onClick={() => setActiveTab('scorers')}
            className={cn(
              "px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors duration-300",
              activeTab === 'scorers' 
                ? "text-fc-green border-b-2 border-fc-green" 
                : "text-gray-500 hover:text-fc-green"
            )}
          >
            <Star size={16} />
            Бомбардиры
          </button>
          
          <button
            onClick={() => setActiveTab('disciplinary')}
            className={cn(
              "px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors duration-300",
              activeTab === 'disciplinary' 
                ? "text-fc-green border-b-2 border-fc-green" 
                : "text-gray-500 hover:text-fc-green"
            )}
          >
            <AlertTriangle size={16} />
            Дисциплина
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {activeTab === 'teams' && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="py-3 px-4 font-medium">№</th>
                <th className="py-3 px-4 font-medium">Команда</th>
                <th className="py-3 px-4 font-medium text-center">И</th>
                <th className="py-3 px-4 font-medium text-center">В</th>
                <th className="py-3 px-4 font-medium text-center">Н</th>
                <th className="py-3 px-4 font-medium text-center">П</th>
                <th className="py-3 px-4 font-medium text-center">Мячи</th>
                <th className="py-3 px-4 font-medium text-center">О</th>
              </tr>
            </thead>
            <tbody>
              {displayData.teams.map((team) => (
                <tr 
                  key={`${team.position}-${team.name}`} 
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 text-center font-medium">
                    {team.position <= 3 ? (
                      <span className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-xs",
                        team.position === 1 ? "bg-fc-yellow" : 
                        team.position === 2 ? "bg-gray-400" : 
                        "bg-[#cd7f32]" // bronze
                      )}>
                        {team.position}
                      </span>
                    ) : team.position}
                  </td>
                  <td className="py-3 px-4 font-medium">{team.name}</td>
                  <td className="py-3 px-4 text-center">{team.played}</td>
                  <td className="py-3 px-4 text-center">{team.won}</td>
                  <td className="py-3 px-4 text-center">{team.drawn}</td>
                  <td className="py-3 px-4 text-center">{team.lost}</td>
                  <td className="py-3 px-4 text-center">{team.goalsFor}-{team.goalsAgainst}</td>
                  <td className="py-3 px-4 text-center font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {activeTab === 'scorers' && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="py-3 px-4 font-medium">№</th>
                <th className="py-3 px-4 font-medium">Игрок</th>
                <th className="py-3 px-4 font-medium">Команда</th>
                <th className="py-3 px-4 font-medium text-center">Голов</th>
              </tr>
            </thead>
            <tbody>
              {displayData.topScorers.map((scorer) => (
                <tr 
                  key={`${scorer.position}-${scorer.name}`} 
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 text-center font-medium">{scorer.position}</td>
                  <td className="py-3 px-4 font-medium">{scorer.name}</td>
                  <td className="py-3 px-4">{scorer.team}</td>
                  <td className="py-3 px-4 text-center font-bold">{scorer.goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {activeTab === 'disciplinary' && (
          <div>
            <h3 className="text-lg font-semibold px-6 py-4 border-b border-gray-100">Предупреждения</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <th className="py-3 px-4 font-medium">№</th>
                  <th className="py-3 px-4 font-medium">Игрок</th>
                  <th className="py-3 px-4 font-medium">Команда</th>
                  <th className="py-3 px-4 font-medium text-center">Предупреждений</th>
                </tr>
              </thead>
              <tbody>
                {displayData.warnings.map((warning) => (
                  <tr 
                    key={`warning-${warning.position}-${warning.name}`} 
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-center font-medium">{warning.position}</td>
                    <td className="py-3 px-4 font-medium">{warning.name}</td>
                    <td className="py-3 px-4">{warning.team}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 bg-fc-yellow/10 text-fc-yellow rounded-full text-xs font-medium">
                        {warning.warnings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <h3 className="text-lg font-semibold px-6 py-4 border-t border-b border-gray-100 mt-4">Удаления</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <th className="py-3 px-4 font-medium">№</th>
                  <th className="py-3 px-4 font-medium">Игрок</th>
                  <th className="py-3 px-4 font-medium">Команда</th>
                  <th className="py-3 px-4 font-medium text-center">Удалений</th>
                </tr>
              </thead>
              <tbody>
                {displayData.expulsions.map((expulsion) => (
                  <tr 
                    key={`expulsion-${expulsion.position}-${expulsion.name}`} 
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-center font-medium">{expulsion.position}</td>
                    <td className="py-3 px-4 font-medium">{expulsion.name}</td>
                    <td className="py-3 px-4">{expulsion.team}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 bg-fc-red/10 text-fc-red rounded-full text-xs font-medium">
                        {expulsion.expulsions}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
        Источник данных: {source} | Данные могут обновляться с задержкой
      </div>
    </div>
  );
};

export default TournamentTable;
