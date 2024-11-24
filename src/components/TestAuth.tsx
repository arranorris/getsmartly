import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function TestAuth() {
  const { user, loading, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      // Simulate a login token for testing
      const testToken = 'test-token';
      await login(testToken);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Test d'authentification</h2>
      <div className="space-y-4">
        <div>
          <p>Statut: {user ? 'Connecté' : 'Non connecté'}</p>
          {user && (
            <p>
              Utilisateur: {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        <div>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Connexion
            </button>
          )}
        </div>
      </div>
    </div>
  );
}