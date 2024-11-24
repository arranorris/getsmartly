import React from 'react';
import {
  Bot,
  Brain,
  BarChart3,
  Settings,
  Users,
  Shield,
  Zap,
  Download,
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: 'Chatbots IA Avancés',
      description:
        "Créez des robots conversationnels intelligents basés sur ChatGPT 3.5 d'OpenAI pour des interactions naturelles et pertinentes.",
    },
    {
      icon: Brain,
      title: 'Personnalisation Complète',
      description:
        'Configurez le comportement, le ton et les connaissances de vos chatbots selon vos besoins spécifiques.',
    },
    {
      icon: BarChart3,
      title: 'Analyses Détaillées',
      description:
        'Suivez les performances de vos chatbots et exportez les conversations en CSV ou PDF pour une analyse approfondie.',
    },
    {
      icon: Settings,
      title: 'Gestion Intuitive',
      description:
        'Interface utilisateur simple et efficace pour gérer tous vos robots conversationnels depuis un seul endroit.',
    },
    {
      icon: Users,
      title: 'Multi-utilisateurs',
      description:
        "Gérez les accès et les permissions de votre équipe avec différents niveaux d'administration.",
    },
    {
      icon: Shield,
      title: 'Sécurité Renforcée',
      description:
        'Protection des données et conformité RGPD pour garantir la confidentialité de vos conversations.',
    },
    {
      icon: Zap,
      title: 'Performance Optimale',
      description:
        'Temps de réponse rapide et haute disponibilité pour une expérience utilisateur fluide.',
    },
    {
      icon: Download,
      title: 'Export Flexible',
      description:
        'Exportez vos données dans différents formats pour une intégration facile avec vos outils existants.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités Principales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les outils et fonctionnalités qui font de GetSmartly.io la solution idéale
            pour vos besoins en chatbots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="h-12 w-12 text-[#D7092E] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}