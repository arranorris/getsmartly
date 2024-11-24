import React from 'react';
import { UserPlus, Settings, Download, Bot } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'new_user',
    message: 'Nouvel utilisateur inscrit',
    user: 'Sophie Bernard',
    time: 'Il y a 5 minutes',
    icon: UserPlus,
  },
  {
    id: 2,
    type: 'settings',
    message: 'Mise à jour des paramètres OpenAI',
    user: 'Admin',
    time: 'Il y a 1 heure',
    icon: Settings,
  },
  {
    id: 3,
    type: 'export',
    message: 'Export des conversations',
    user: 'Jean Dupont',
    time: 'Il y a 2 heures',
    icon: Download,
  },
  {
    id: 4,
    type: 'new_bot',
    message: 'Nouveau robot créé',
    user: 'Marie Martin',
    time: 'Il y a 3 heures',
    icon: Bot,
  },
];

export default function RecentActivity() {
  const getIconColor = (type: string) => {
    switch (type) {
      case 'new_user':
        return 'text-green-600';
      case 'settings':
        return 'text-blue-600';
      case 'export':
        return 'text-yellow-600';
      case 'new_bot':
        return 'text-[#D7092E]';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Activité récente</h2>
      <div className="space-y-6">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex space-x-3">
              <div className={`flex-shrink-0 ${getIconColor(activity.type)}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-900">{activity.message}</p>
                <div className="flex space-x-2 text-sm text-gray-500">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}