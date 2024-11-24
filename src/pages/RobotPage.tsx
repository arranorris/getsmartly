import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRobotById } from '../utils/storage';
import { Robot } from '../types';
import ChatInterface from '../components/ChatInterface';
import { useAuth } from '../context/AuthContext';

export default function RobotPage() {
  const { robotId } = useParams<{ robotId: string }>();
  const [robot, setRobot] = useState<Robot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (robotId) {
      const foundRobot = getRobotById(robotId);
      if (foundRobot) {
        setRobot(foundRobot);
      } else {
        setError('Robot introuvable');
      }
    }
  }, [robotId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error}
          </h1>
          <p className="text-gray-600">
            Le robot que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  if (!robot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D7092E] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ChatInterface
      robot={robot}
      onClose={() => window.close()}
    />
  );
}