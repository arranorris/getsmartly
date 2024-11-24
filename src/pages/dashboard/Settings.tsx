import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    apiKey: '',
    defaultTemperature: '0.7',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (formData.newPassword && formData.newPassword.length < 8) {
        throw new Error('Le nouveau mot de passe doit contenir au moins 8 caractères');
      }

      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      // Simuler la mise à jour des paramètres
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Paramètres mis à jour avec succès');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="mt-1 text-gray-600">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center space-x-2 text-green-600">
            <AlertCircle className="h-5 w-5" />
            <span>{success}</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations personnelles
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Changer le mot de passe
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, currentPassword: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Paramètres des robots
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Clé API OpenAI
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={formData.apiKey}
                    onChange={(e) =>
                      setFormData({ ...formData, apiKey: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Votre clé API OpenAI est nécessaire pour le fonctionnement des
                    robots
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="defaultTemperature"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Température par défaut
                  </label>
                  <input
                    type="number"
                    id="defaultTemperature"
                    value={formData.defaultTemperature}
                    onChange={(e) =>
                      setFormData({ ...formData, defaultTemperature: e.target.value })
                    }
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Valeur entre 0 et 1. Une valeur plus élevée rend les réponses
                    plus créatives
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#D7092E] text-white px-6 py-2 rounded-md hover:bg-[#b8072a] transition-colors"
            >
              Enregistrer les modifications
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}