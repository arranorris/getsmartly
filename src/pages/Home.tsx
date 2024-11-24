import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Brain, BarChart3, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FEE6E6] to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Donnez vie à vos robots conversationnels
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Créez, personnalisez et gérez facilement vos chatbots intelligents avec GetSmartly.io
            </p>
            <Link
              to="/inscription"
              className="inline-block bg-[#D7092E] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#b8072a] transition-colors"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Pourquoi choisir GetSmartly.io ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Bot className="h-12 w-12 text-[#D7092E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chatbots Intelligents</h3>
              <p className="text-gray-600">
                Créez des robots conversationnels basés sur ChatGPT 3.5 d'OpenAI
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Brain className="h-12 w-12 text-[#D7092E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personnalisation Avancée</h3>
              <p className="text-gray-600">
                Configurez le comportement et les instructions de vos chatbots
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <BarChart3 className="h-12 w-12 text-[#D7092E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analyses Détaillées</h3>
              <p className="text-gray-600">
                Exportez et analysez les conversations en CSV ou PDF
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Settings className="h-12 w-12 text-[#D7092E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestion Simplifiée</h3>
              <p className="text-gray-600">
                Interface intuitive pour gérer vos robots et paramètres
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FEE6E6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à améliorer votre service client ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez les entreprises qui font confiance à GetSmartly.io
          </p>
          <Link
            to="/inscription"
            className="inline-block bg-[#D7092E] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#b8072a] transition-colors"
          >
            Commencer maintenant
          </Link>
        </div>
      </div>
    </div>
  );
}