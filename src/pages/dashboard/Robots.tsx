import { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Robot } from '../../types';
import { getRobots, saveRobot, deleteRobot } from '../../utils/storage';
import RobotCard from '../../components/RobotCard';
import RobotModal from '../../components/RobotModal';
import ChatInterface from '../../components/ChatInterface';
import EmptyState from '../../components/EmptyState';

export default function Robots() {
  const [robots, setRobots] = useState<Robot[]>(getRobots());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRobot, setEditingRobot] = useState<Robot | null>(null);
  const [chatRobot, setChatRobot] = useState<Robot | null>(null);

  const handleSave = (data: { name: string; temperature: number; instructions: string }) => {
    const newRobot: Robot = {
      id: editingRobot?.id || crypto.randomUUID(),
      ...data,
      logs: editingRobot?.logs || [],
      createdAt: editingRobot?.createdAt || new Date().toISOString(),
      lastActive: editingRobot?.lastActive || null,
    };

    saveRobot(newRobot);
    setRobots(getRobots());
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce robot ?')) {
      deleteRobot(id);
      setRobots(getRobots());
    }
  };

  const handleExport = (robot: Robot) => {
    const logs = robot.logs.map(log => ({
      timestamp: new Date(log.timestamp).toLocaleString(),
      message: log.message,
      response: log.response,
    }));

    const csv = [
      ['Date', 'Message', 'Réponse'],
      ...logs.map(log => [log.timestamp, log.message, log.response]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${robot.name}-logs.csv`;
    link.click();
  };

  const handleOpenModal = (robot?: Robot) => {
    setEditingRobot(robot || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRobot(null);
  };

  const handleOpenChat = (robot: Robot) => {
    setChatRobot(robot);
  };

  const handleCloseChat = () => {
    setChatRobot(null);
    setRobots(getRobots()); // Rafraîchir la liste pour voir les nouveaux messages
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mes robots</h1>
            <p className="mt-1 text-gray-600">
              Gérez vos robots conversationnels
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-[#D7092E] text-white px-4 py-2 rounded-md hover:bg-[#b8072a] transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nouveau robot</span>
          </button>
        </div>

        {robots.length === 0 ? (
          <EmptyState onCreateClick={() => handleOpenModal()} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {robots.map((robot) => (
              <RobotCard
                key={robot.id}
                robot={robot}
                onEdit={() => handleOpenModal(robot)}
                onDelete={handleDelete}
                onExport={handleExport}
                onChat={() => handleOpenChat(robot)}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <RobotModal
          robot={editingRobot || undefined}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {chatRobot && (
        <ChatInterface
          robot={chatRobot}
          onClose={handleCloseChat}
        />
      )}
    </DashboardLayout>
  );
}