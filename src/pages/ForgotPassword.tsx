import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de réinitialisation
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Bot className="h-10 w-10 text-[#D7092E]" />
            <span className="text-2xl font-bold text-gray-900">GetSmartly.io</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié</h1>
          <p className="text-gray-600">
            Entrez votre email pour réinitialiser votre mot de passe
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D7092E] text-white py-3 px-6 rounded-md hover:bg-[#b8072a] transition-colors"
              >
                Envoyer les instructions
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-4 text-green-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Instructions envoyées !
              </h3>
              <p className="text-gray-600 mb-6">
                Si un compte existe avec l'adresse {email}, vous recevrez un email avec les
                instructions pour réinitialiser votre mot de passe.
              </p>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/connexion"
              className="flex items-center justify-center text-[#D7092E] hover:text-[#b8072a]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}