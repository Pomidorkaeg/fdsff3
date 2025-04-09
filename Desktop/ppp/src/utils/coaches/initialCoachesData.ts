
import { Coach } from '@/types/coach';

// Initial sample coaches data that can be fully managed
export const initialCoaches: Coach[] = [
  {
    id: 'coach1',
    name: 'Александр Иванов',
    role: 'Главный тренер',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3',
    since: '2018',
    experience: 15,
    biography: 'Александр Иванов - опытный тренер с богатым опытом в профессиональном футболе. Под его руководством команда добилась значительных успехов на региональных соревнованиях.',
    teamId: 'gudauta'
  },
  {
    id: 'coach2',
    name: 'Сергей Петров',
    role: 'Тренер вратарей',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3',
    since: '2019',
    experience: 12,
    biography: 'Сергей Петров специализируется на подготовке вратарей. Ранее выступал за профессиональные клубы России и имеет богатый опыт работы с молодыми спортсменами.',
    teamId: 'gudauta'
  },
  {
    id: 'coach3',
    name: 'Дмитрий Александрович Сидоров',
    role: 'Руководитель спортивной школы',
    image: 'https://images.unsplash.com/photo-1571512599940-7dfed49b7e00?ixlib=rb-4.0.3',
    since: '2015',
    experience: 18,
    biography: 'Дмитрий Александрович руководит спортивной школой Гудаута с момента её основания. Под его руководством была разработана уникальная методика подготовки молодых футболистов.',
    teamId: 'gudauta-school'
  }
];
