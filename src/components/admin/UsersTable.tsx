import React, { useState } from 'react';
import { Search, Edit2, Trash2, Play, Pause } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'paused' | 'deleted';
  subscription: 'free' | 'pro' | 'enterprise';
  robots: number;
  lastActive: string;
}

export default function UsersTable() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      status: 'active',
      subscription: 'pro',
      robots: 3,
      lastActive: '2024-03-15',
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      status: 'paused',
      subscription: 'enterprise',
      robots: 8,
      lastActive: '2024-03-14',
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      status: 'active',
      subscription: 'free',
      robots: 1,
      lastActive: '2024-03-15',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'free':
        return 'bg-gray-100 text-gray-800';
      case 'pro':
        return 'bg-blue-100 text-blue-800';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Utilisateurs</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Utilisateur</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3">Abonnement</th>
                <th className="pb-3">Robots</th>
                <th className="pb-3">Dernière activité</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="text-sm">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionColor(
                        user.subscription
                      )}`}
                    >
                      {user.subscription}
                    </span>
                  </td>
                  <td className="py-4">{user.robots}</td>
                  <td className="py-4">{user.lastActive}</td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-[#D7092E]">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button className="text-gray-600 hover:text-yellow-600">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="text-gray-600 hover:text-green-600">
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}