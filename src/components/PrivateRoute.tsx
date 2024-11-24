import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type PrivateRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export default function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D7092E] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}