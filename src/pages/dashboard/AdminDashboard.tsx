import React from 'react';
import { Users, Bot, Activity, Settings } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatsCard from '../../components/admin/StatsCard';
import RecentActivity from '../../components/admin/RecentActivity';
import UsersTable from '../../components/admin/UsersTable';

export default function AdminDashboard() {
  const stats = [
    {
      name: 'Utilisateurs totaux',
      value: '156',
      icon: Users,
      change: '+12% vs. mois dernier',
      changeType: 'increase',
    },
    {
      name: 'Robots actifs',
      value: '423',
      icon: Bot,
      change: '+25% vs. mois dernier',
      changeType: 'increase',
    },
    {
      name: 'Messages échangés',
      value: '15,234',
      icon: Activity,
      change: '+18% vs. mois dernier',
      changeType: 'increase',
    },
    {
      name: 'Taux de satisfaction',
      value: '98%',
      icon: Settings,
      change: '+2% vs. mois dernier',
      changeType: 'increase',
    },
  ];

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
          <p className="mt-1 text-gray-600">
            Gérez les utilisateurs et surveillez les performances globales
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <UsersTable />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}