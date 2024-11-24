import { useState } from 'react';
import { X } from 'lucide-react';
import { Robot } from '../types';

interface RobotModalProps {
  robot?: Robot;
  onClose: () => void;
  onSave: (data: { name: string; temperature: number; instructions: string }) => void;
}

export default function RobotModal({ robot, onClose, onSave }: RobotModalProps) {
  const [formData, setFormData] = useState({
    name: robot?.name || '',
    temperature: robot?.temperature || 0.7,
    instructions: robot?.instructions || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {robot ? 'Modifier le robot' : 'Nouveau robot'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom du robot
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
            />
          </div>

          <div>
            <label
              htmlFor="temperature"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Température ({formData.temperature})
            </label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="1"
              step="0.1"
              value={formData.temperature}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  temperature: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Instructions personnalisées
            </label>
            <textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D7092E] text-white py-2 px-4 rounded-md hover:bg-[#b8072a] transition-colors"
          >
            {robot ? 'Enregistrer' : 'Créer'}
          </button>
        </form>
      </div>
    </div>
  );
}