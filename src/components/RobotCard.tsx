import { Download, Pencil, Trash2, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { Robot } from '../types';

interface RobotCardProps {
  robot: Robot;
  onEdit: (robot: Robot) => void;
  onDelete: (id: string) => void;
  onExport: (robot: Robot) => void;
  onChat: (robot: Robot) => void;
}

export default function RobotCard({ robot, onEdit, onDelete, onExport, onChat }: RobotCardProps) {
  const robotUrl = `${window.location.origin}/robot/${robot.id}`;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(robotUrl);
      alert('URL copiée dans le presse-papier');
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">
          {robot.name}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onChat(robot)}
            className="text-gray-600 hover:text-[#D7092E]"
            title="Discuter"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEdit(robot)}
            className="text-gray-600 hover:text-[#D7092E]"
            title="Modifier"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(robot.id)}
            className="text-gray-600 hover:text-red-600"
            title="Supprimer"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Température: {robot.temperature}
        </p>
        <p className="text-sm text-gray-600">
          Messages: {robot.logs.length}
        </p>
        <p className="text-sm text-gray-600">
          Dernière activité:{' '}
          {robot.lastActive
            ? new Date(robot.lastActive).toLocaleDateString()
            : 'Jamais utilisé'}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <button
          onClick={() => onExport(robot)}
          className="flex items-center space-x-2 text-[#D7092E] hover:text-[#b8072a]"
        >
          <Download className="h-5 w-5" />
          <span>Exporter</span>
        </button>

        <button
          onClick={copyUrl}
          className="flex items-center space-x-2 text-[#D7092E] hover:text-[#b8072a]"
          title="Copier l'URL du robot"
        >
          <LinkIcon className="h-5 w-5" />
          <span>Copier l'URL</span>
        </button>
      </div>
    </div>
  );
}