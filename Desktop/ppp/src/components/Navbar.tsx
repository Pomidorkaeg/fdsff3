
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Команда', path: '/team' },
    { name: 'Новости', path: '/news' },
    { name: 'Матчи', path: '/matches' },
    { name: 'Соревнования', path: '/tournaments' },
    { name: 'Медиа', path: '/media' },
    { name: 'Контакты', path: '/contacts' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-fc-darkGreen shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-fc-yellow font-bold text-xl">ФК ГУДАУТА</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link px-4 py-2 rounded-md text-base font-medium transition-all duration-200",
                  isActive(link.path) 
                    ? "text-fc-yellow bg-fc-darkGreen/50" 
                    : "text-white hover:text-fc-yellow hover:bg-fc-darkGreen/30"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-white hover:text-fc-yellow focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-[4rem] bg-fc-darkGreen/95 backdrop-blur-md transition-all duration-300 ease-in-out transform origin-top",
        isMenuOpen ? "opacity-100 scale-y-100 shadow-lg" : "opacity-0 scale-y-0 pointer-events-none"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150",
                isActive(link.path) 
                  ? "text-fc-yellow bg-fc-green/70" 
                  : "text-white hover:text-fc-yellow hover:bg-fc-green/50"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
