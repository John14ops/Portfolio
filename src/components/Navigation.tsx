import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onAdminClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection, onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="font-bold text-xl cursor-pointer transition-colors duration-300 hover:text-yellow-500 text-black dark:text-white"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-black dark:text-white">Louis</span>
            <span className="text-yellow-500"> SKWIZ</span>
          </div>

          {/* Desktop Menu & Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-yellow-500 ${
                    activeSection === item.id ? 'text-yellow-500' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={onAdminClick}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                title="Administration"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white dark:bg-gray-900 shadow-lg`}>
        <div className="px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-yellow-500 ${
                activeSection === item.id ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Thème</span>
            <ThemeToggle />
          </div>
          <button
            onClick={() => {
              onAdminClick();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors duration-300"
          >
            Administration
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;