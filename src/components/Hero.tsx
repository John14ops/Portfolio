import React from 'react';
import { ChevronDown, Download, Mail } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 lg:pt-0">
          {/* Left Side - Text Content */}
          <div className="text-left order-2 lg:order-1">
            {/* Greeting Animation */}
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">Bonjour, je suis</span>
                <br />
                <span className="text-yellow-500 relative">
                  Louis SKWIZ
                  <div className="absolute -bottom-2 left-0 w-20 sm:w-24 h-1 bg-yellow-500 rounded-full"></div>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up animation-delay-200">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Développeur Full-Stack passionné • Designer • Créateur d'expériences numériques
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-yellow-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Voir mes projets
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                Me contacter
              </button>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="animate-fade-in-up animation-delay-400 order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-500 mb-2">2+</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Années d'expérience</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-500 mb-2">10+</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Technologies maîtrisées</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-500 mb-2">3</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Projets déployés</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce mt-8 lg:mt-16 text-center">
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 transition-colors duration-300"
          >
            <ChevronDown size={28} className="sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
