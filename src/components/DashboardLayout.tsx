import { Link, useLocation } from 'react-router-dom';
import {
  Bot,
  LayoutDashboard,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    {
      name: 'Tableau de bord',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Mes robots',
      href: '/dashboard/robots',
      icon: Bot,
    },
    {
      name: 'Paramètres',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center space-x-2 px-6 py-4 border-b">
          <Bot className="h-8 w-8 text-[#D7092E]" />
          <span className="text-xl font-bold text-gray-900">GetSmartly.io</span>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#FEE6E6] text-[#D7092E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={logout}
            className="flex items-center space-x-2 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  );
}