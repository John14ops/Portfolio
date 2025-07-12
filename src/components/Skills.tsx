import React from 'react';
import { 
  Monitor, 
  Server, 
  Database, 
  Shield, 
  BarChart3, 
  Users, 
  Wrench,
  Code,
  Smartphone,
  Palette,
  Lock,
  Brain
} from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Développement Frontend",
      icon: <Monitor className="w-6 h-6" />,
      color: "bg-blue-500",
      skills: [
        { name: "HTML / CSS / JavaScript", level: 90 },
        { name: "Flutter (mobile)", level: 85 },
        { name: "React", level: 70 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Figma", level: 80 }
      ]
    },
    {
      title: "Développement Backend",
      icon: <Server className="w-6 h-6" />,
      color: "bg-green-500",
      skills: [
        { name: "Supabase", level: 90 },
        { name: "Node.js / Express", level: 75 },
        { name: "REST API", level: 85 },
        { name: "PostgreSQL", level: 80 }
      ]
    },
    {
      title: "Base de Données & Stockage",
      icon: <Database className="w-6 h-6" />,
      color: "bg-purple-500",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "Firebase", level: 80 },
        { name: "SQL", level: 90 }
      ]
    },
    {
      title: "Cybersécurité",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-red-500",
      skills: [
        { name: "Sécurisation API", level: 75 },
        { name: "Authentification", level: 80 },
        { name: "OWASP", level: 70 }
      ]
    },
    {
      title: "Data & ML",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-yellow-500",
      skills: [
        { name: "Python", level: 70 },
        { name: "Pandas", level: 65 },
        { name: "Scikit-learn", level: 60 }
      ]
    },
    {
      title: "Outils & Environnement",
      icon: <Wrench className="w-6 h-6" />,
      color: "bg-indigo-500",
      skills: [
        { name: "Git / GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Android Studio", level: 80 },
        { name: "Notion / Trello", level: 85 }
      ]
    }
  ];

  const softSkills = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Pensée analytique",
      description: "Résolution de problèmes complexes"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Apprentissage rapide",
      description: "Autonomie et adaptation"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Créativité",
      description: "Design et innovation"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Esprit d'équipe",
      description: "Collaboration et écoute"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mes <span className="text-yellow-500">Compétences</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            🧰 Un arsenal technique complet pour donner vie à vos projets
          </p>
        </div>

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🧠 Soft Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:bg-yellow-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-yellow-600">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h4>
                <p className="text-gray-600 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Prêt à collaborer ?</h3>
            <p className="text-lg mb-6 opacity-90">
              Discutons de votre prochain projet et voyons comment mes compétences peuvent vous aider
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Contactez-moi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;