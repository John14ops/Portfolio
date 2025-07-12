import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold">
              <span className="text-white">Louis</span>
              <span className="text-yellow-500"> SKWIZ</span>
            </h3>
            <p className="text-gray-400 mt-2">Développeur Full-Stack & Designer</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              { id: 'home', label: 'Accueil' },
              { id: 'about', label: 'À propos' },
              { id: 'skills', label: 'Compétences' },
              { id: 'projects', label: 'Projets' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(item.id);
                  }
                }}
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-gray-400 flex items-center gap-2">
                © {currentYear} Louis SKWIZ. Fait avec 
                <Heart size={16} className="text-red-500" fill="currentColor" />
                et beaucoup de café ☕
              </p>

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <span>Retour en haut</span>
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;