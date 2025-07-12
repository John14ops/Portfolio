import React from 'react';
import { ExternalLink, Code, Smartphone } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "PC Boutique",
      description: "Site e-commerce moderne pour la vente de PC et composants informatiques. Interface utilisateur intuitive avec panier d'achat, filtres avancés et système de paiement sécurisé.",
      url: "http://pc-boutique.vercel.app",
      technologies: ["React", "CSS", "JavaScript", "E-commerce"],
      category: "E-commerce"
    },
    {
      id: 2,
      title: "Free Use",
      description: "Plateforme de vente de créations personnalisées artisanales. Design élégant mettant en valeur les produits uniques avec galerie interactive et commandes sur mesure.",
      url: "https://chez-kat.vercel.app",
      technologies: ["HTML", "CSS", "JavaScript", "Design"],
      category: "Artisanat"
    },
    {
      id: 3,
      title: "PC Store",
      description: "Deuxième itération d'un site de vente de PC avec améliorations UX/UI. Performance optimisée, navigation fluide et expérience d'achat améliorée.",
      url: "http://pc-store-six.vercel.app",
      technologies: ["React", "Tailwind", "JavaScript", "Responsive"],
      category: "E-commerce"
    }
  ];

  const currentProject = {
    title: "Application Mobile de Livraison",
    description: "Développement en cours d'une application mobile cross-platform avec Flutter pour la livraison de repas. Intégration GPS, paiements sécurisés et suivi en temps réel.",
    technologies: ["Flutter", "Dart", "Firebase", "Google Maps", "Stripe"],
    status: "En développement",
    progress: 75
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mes <span className="text-yellow-500">Projets</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez quelques réalisations qui illustrent mon expertise technique et ma créativité
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Project Header */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-2">{project.title}</div>
                  <div className="text-lg opacity-90">{project.category}</div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Voir le site
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-semibold transition-colors duration-300"
                >
                  <Code size={18} />
                  Voir le projet
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Current Project */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{currentProject.title}</h3>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentProject.status}
              </span>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
            {currentProject.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Progression du développement</span>
              <span className="text-yellow-400 font-bold">{currentProject.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${currentProject.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {currentProject.technologies.map((tech, index) => (
              <span 
                key={index}
                className="bg-gray-700 dark:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-sm font-medium border border-gray-600 dark:border-gray-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Vous avez un projet en tête ?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Je serais ravi de discuter de votre projet et de voir comment nous pouvons le concrétiser ensemble.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Discutons de votre projet
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
