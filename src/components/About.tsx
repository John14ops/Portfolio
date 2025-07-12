import React from 'react';
import { Brain, Code, Lightbulb, Target, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Développement Full-Stack",
      description: "Frontend moderne et backend robuste"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Machine Learning & Big Data",
      description: "Intégration intelligente des données"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Cybersécurité",
      description: "Applications sécurisées et protégées"
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Solutions créatives pour des problèmes complexes"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "Code de qualité et performance optimale"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Travail d'équipe et communication efficace"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À propos de <span className="text-yellow-500">moi</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio Text */}
          <div className="space-y-6">
            <div className="bg-yellow-50 rounded-2xl p-8">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Je m'appelle <strong className="text-yellow-600">Louis</strong>, développeur passionné spécialisé en 
                développement full-stack, avec un intérêt marqué pour le machine learning, 
                le big data et la cybersécurité.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Curieux de nature, j'aime comprendre comment les systèmes fonctionnent en profondeur, 
                tout en créant des interfaces intuitives et performantes.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                Mon objectif est simple : concevoir des applications robustes, utiles et bien pensées, 
                en combinant design, logique métier et performance.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Projects & Values */}
          <div className="space-y-8">
            {/* What I'm doing */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                💡 Ce que je fais actuellement
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Développement d'une application mobile de livraison</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Création d'interfaces admin et e-commerce sur mesure</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mise en place d'architectures backend sécurisées et scalables</span>
                </li>
              </ul>
            </div>

            {/* What I love */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🧠 Ce que j'aime
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Résoudre des problèmes complexes avec des solutions simples</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apprendre en continu et rester à jour sur les dernières technologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Travailler en équipe ou en autonomie, du prototype au produit final</span>
                </li>
              </ul>
            </div>

            {/* Ambition */}
            <div className="bg-yellow-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                🎯 Mon ambition
              </h3>
              <p className="leading-relaxed">
                Devenir un développeur d'exception, capable de porter des projets ambitieux de bout en bout, 
                avec une vision claire, une exécution solide, et une touche personnelle dans chaque ligne de code.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Mes valeurs</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-yellow-50 transition-colors duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-yellow-600">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;