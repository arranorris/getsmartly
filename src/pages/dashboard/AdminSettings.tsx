import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { validateOpenAiApiKey, setOpenAiApiKey, getOpenAiApiKey, clearOpenAiApiKey } from '../../utils/openai';

export default function AdminSettings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    apiKey: '',
  });

  const handleTestApiKey = async () => {
    setError(null);
    setSuccess(null);
    setIsValidating(true);

    try {
      const isValid = await validateOpenAiApiKey(formData.apiKey);
      if (isValid) {
        setSuccess('La clé API est valide !');
      } else {
        setError('La clé API est invalide. Veuillez vérifier et réessayer.');
      }
    } catch (err) {
      setError('Erreur lors de la validation de la clé API');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveApiKey = async () => {
    setError(null);
    setSuccess(null);
    setIsValidating(true);

    try {
      const isValid = await validateOpenAiApiKey(formData.apiKey);
      if (isValid) {
        setOpenAiApiKey(formData.apiKey);
        setSuccess('La clé API a été enregistrée avec succès !');
        setFormData({ apiKey: '' });
      } else {
        setError('La clé API est invalide. Veuillez vérifier et réessayer.');
      }
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de la clé API');
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearApiKey = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer la clé API ?')) {
      clearOpenAiApiKey();
      setSuccess('La clé API a été supprimée');
    }
  };

  const getCurrentApiKey = () => {
    try {
      const key = getOpenAiApiKey();
      return `sk-${key.slice(-4)}`;
    } catch {
      return null;
    }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres OpenAI</h1>
          <p className="mt-1 text-gray-600">
            Configurez la clé API OpenAI pour tous les utilisateurs
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
          <div className="space-y-6">
            {getCurrentApiKey() && (
              <div className="pb-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Clé API actuelle
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{getCurrentApiKey()}</p>
                  <button
                    onClick={handleClearApiKey}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {getCurrentApiKey() ? 'Modifier la clé API' : 'Ajouter une clé API'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Clé API OpenAI
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      id="apiKey"
                      value={formData.apiKey}
                      onChange={(e) =>
                        setFormData({ ...formData, apiKey: e.target.value })
                      }
                      placeholder="sk-..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Cette clé API sera utilisée par tous les robots de la plateforme
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleTestApiKey}
                    disabled={!formData.apiKey || isValidating}
                    className="px-4 py-2 border border-[#D7092E] text-[#D7092E] rounded-md hover:bg-[#FEE6E6] transition-colors disabled:opacity-50"
                  >
                    {isValidating ? 'Test en cours...' : 'Tester la clé'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveApiKey}
                    disabled={!formData.apiKey || isValidating}
                    className="px-4 py-2 bg-[#D7092E] text-white rounded-md hover:bg-[#b8072a] transition-colors disabled:opacity-50"
                  >
                    {isValidating ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}