import { Bot, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export default function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-md">
      <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Aucun robot n'a été créé
      </h3>
      <p className="text-gray-600 mb-4">
        Commencez par créer votre premier robot conversationnel
      </p>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center space-x-2 bg-[#D7092E] text-white px-4 py-2 rounded-md hover:bg-[#b8072a] transition-colors"
      >
        <Plus className="h-5 w-5" />
        <span>Créer un robot</span>
      </button>
    </div>
  );
}