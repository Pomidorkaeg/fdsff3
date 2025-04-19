import { useState, useEffect } from 'react';
import { fetchMatches, addMatch as apiAddMatch, updateMatch as apiUpdateMatch, deleteMatch as apiDeleteMatch } from '@/utils/api/matches';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: MatchStatus;
  score?: {
    home: number;
    away: number;
  };
}

const STORAGE_KEY = 'matches';

// Добавляем тестовые матчи по умолчанию
const DEFAULT_MATCHES: Match[] = [
  {
    id: '1',
    homeTeam: 'Гудаута',
    awayTeam: 'Динамо',
    date: '25.03.2024',
    time: '15:00',
    venue: 'Стадион им. Даура Ахвледиани',
    competition: 'Чемпионат Абхазии',
    status: 'scheduled'
  },
  {
    id: '2',
    homeTeam: 'Гудаута',
    awayTeam: 'Рица',
    date: '01.04.2024',
    time: '16:00',
    venue: 'Стадион им. Даура Ахвледиани',
    competition: 'Кубок Абхазии',
    status: 'scheduled'
  },
  {
    id: '3',
    homeTeam: 'Афон',
    awayTeam: 'Гудаута',
    date: '10.04.2024',
    time: '17:00',
    venue: 'Стадион "Афон Арена"',
    competition: 'Чемпионат Абхазии',
    status: 'scheduled'
  }
];

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      console.log('Loading matches...');
      try {
        // Try to fetch matches from API first
        const apiMatches = await fetchMatches();
        console.log('API matches:', apiMatches);
        if (apiMatches && apiMatches.length > 0) {
          setMatches(apiMatches);
          // Update localStorage as backup
          localStorage.setItem(STORAGE_KEY, JSON.stringify(apiMatches));
          console.log('Matches loaded from API and saved to localStorage');
        } else {
          // If API returns empty, try to load from localStorage
          const storedMatches = localStorage.getItem(STORAGE_KEY);
          console.log('Stored matches from localStorage:', storedMatches);
          if (storedMatches) {
            const parsedMatches = JSON.parse(storedMatches);
            if (parsedMatches && parsedMatches.length > 0) {
              setMatches(parsedMatches);
              console.log('Matches loaded from localStorage');
            } else {
              // If localStorage is empty, use default matches
              setMatches(DEFAULT_MATCHES);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MATCHES));
              console.log('Using default matches');
            }
          } else {
            // If no stored matches, use default matches
            setMatches(DEFAULT_MATCHES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MATCHES));
            console.log('Using default matches');
          }
        }
      } catch (error) {
        console.error('Error loading matches:', error);
        // If API fails, try to load from localStorage
        try {
          const storedMatches = localStorage.getItem(STORAGE_KEY);
          console.log('Stored matches from localStorage after API error:', storedMatches);
          if (storedMatches) {
            const parsedMatches = JSON.parse(storedMatches);
            if (parsedMatches && parsedMatches.length > 0) {
              setMatches(parsedMatches);
              console.log('Matches loaded from localStorage after API error');
            } else {
              // If localStorage is empty, use default matches
              setMatches(DEFAULT_MATCHES);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MATCHES));
              console.log('Using default matches after API error');
            }
          } else {
            // If no stored matches, use default matches
            setMatches(DEFAULT_MATCHES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MATCHES));
            console.log('Using default matches after API error');
          }
        } catch (e) {
          console.error('Error loading matches from localStorage:', e);
          // If localStorage fails, use default matches
          setMatches(DEFAULT_MATCHES);
          console.log('Using default matches after all errors');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newMatches = e.newValue ? JSON.parse(e.newValue) : DEFAULT_MATCHES;
          console.log('Storage event - new matches:', newMatches);
          setMatches(newMatches);
        } catch (error) {
          console.error('Error parsing matches from storage event:', error);
          setMatches(DEFAULT_MATCHES);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveMatches = async (newMatches: Match[]) => {
    console.log('Saving matches:', newMatches);
    try {
      // Try to save to API first
      for (const match of newMatches) {
        if (!matches.find(m => m.id === match.id)) {
          await apiAddMatch(match);
        } else {
          await apiUpdateMatch(match);
        }
      }
      // Update localStorage as backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Matches saved to API and localStorage');
    } catch (error) {
      console.error('Error saving matches:', error);
      // If API fails, save to localStorage only
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
        setMatches(newMatches);
        console.log('Matches saved to localStorage only');
      } catch (e) {
        console.error('Error saving matches to localStorage:', e);
        setMatches(DEFAULT_MATCHES);
      }
    }
  };

  const addMatch = async (match: Match) => {
    console.log('Adding match:', match);
    try {
      const savedMatch = await apiAddMatch(match);
      const newMatches = [...matches, savedMatch];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Match added to API and localStorage');
    } catch (error) {
      console.error('Error adding match:', error);
      // If API fails, save to localStorage only
      const newMatches = [...matches, match];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Match added to localStorage only');
    }
  };

  const updateMatch = async (updatedMatch: Match) => {
    console.log('Updating match:', updatedMatch);
    try {
      const savedMatch = await apiUpdateMatch(updatedMatch);
      const newMatches = matches.map(match => 
        match.id === savedMatch.id ? savedMatch : match
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Match updated in API and localStorage');
    } catch (error) {
      console.error('Error updating match:', error);
      // If API fails, update localStorage only
      const newMatches = matches.map(match => 
        match.id === updatedMatch.id ? updatedMatch : match
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Match updated in localStorage only');
    }
  };

  const deleteMatch = async (matchId: string) => {
    console.log('Deleting match:', matchId);
    try {
      await apiDeleteMatch(matchId);
      const newMatches = matches.filter(match => match.id !== matchId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Match deleted from API and localStorage');
    } catch (error) {
      console.error('Error deleting match:', error);
      // If API fails, update localStorage only
      const newMatches = matches.filter(match => match.id !== matchId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      setMatches(newMatches);
      console.log('Match deleted from localStorage only');
    }
  };

  return {
    matches,
    isLoading,
    error,
    addMatch,
    updateMatch,
    deleteMatch,
  };
}; 