import { useEffect, useState } from 'react';
import { Bot, MessageSquare, Users } from 'lucide-react';
import { getStats } from '../../utils/storage';
import { Stats } from '../../types';

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats>({
    activeRobots: 0,
    totalMessages: 0,
    uniqueUsers: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      const currentStats = getStats();
      setStats(currentStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-gray-600">
          Bienvenue sur votre espace GetSmartly.io
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Robots actifs</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.activeRobots}
              </p>
            </div>
            <Bot className="h-8 w-8 text-[#D7092E]" />
          </div>
          {stats.activeRobots === 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Aucun robot actif. Créez votre premier robot !
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages échangés</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.totalMessages}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-[#D7092E]" />
          </div>
          {stats.totalMessages === 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Aucun message échangé pour le moment
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilisateurs uniques</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.uniqueUsers}
              </p>
            </div>
            <Users className="h-8 w-8 text-[#D7092E]" />
          </div>
          {stats.uniqueUsers === 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Aucun utilisateur n'a encore interagi
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Activité récente
        </h2>
        {stats.totalMessages === 0 ? (
          <p className="text-gray-500">Aucune activité récente à afficher</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-4 border-b">
              <div className="flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-[#D7092E]" />
              </div>
              <div>
                <p className="text-gray-900">
                  Nouvelle conversation avec Assistant Commercial
                </p>
                <p className="text-sm text-gray-600">Il y a 5 minutes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}