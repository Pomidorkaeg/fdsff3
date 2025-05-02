
import { Player } from '@/types/player';

// Initial sample players data that can be fully managed
export const initialPlayers: Player[] = [
  {
    id: 'player1',
    name: 'Александр Петров',
    position: 'Вратарь',
    number: 1,
    birthDate: '15.03.1998',
    height: 188,
    weight: 82,
    nationality: 'Россия',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3',
    matches: 24,
    goals: 0,
    assists: 2,
    yellowCards: 1,
    redCards: 0,
    teamId: 'gudauta'
  },
  {
    id: 'player2',
    name: 'Иван Соколов',
    position: 'Защитник',
    number: 4,
    birthDate: '22.07.1996',
    height: 185,
    weight: 78,
    nationality: 'Россия',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3',
    matches: 28,
    goals: 1,
    assists: 3,
    yellowCards: 4,
    redCards: 0,
    teamId: 'gudauta'
  },
  {
    id: 'player3',
    name: 'Михаил Волков',
    position: 'Полузащитник',
    number: 10,
    birthDate: '05.05.1999',
    height: 175,
    weight: 70,
    nationality: 'Россия',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
    matches: 30,
    goals: 8,
    assists: 12,
    yellowCards: 2,
    redCards: 0,
    teamId: 'gudauta'
  },
  {
    id: 'player4',
    name: 'Артем Козлов',
    position: 'Нападающий',
    number: 9,
    birthDate: '12.10.1997',
    height: 182,
    weight: 76,
    nationality: 'Россия',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3',
    matches: 26,
    goals: 15,
    assists: 5,
    yellowCards: 3,
    redCards: 1,
    teamId: 'gudauta'
  }
  // Removed school players (Егор Морозов, Кирилл Попов, Максим Лебедев)
];
