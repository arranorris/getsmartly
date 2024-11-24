import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader2 } from 'lucide-react';
import { Robot, ChatLog } from '../types';
import { addChatLog } from '../utils/storage';
import { sendMessageToOpenAI } from '../utils/openai';
import { useAuth } from '../context/AuthContext';

interface ChatInterfaceProps {
  robot: Robot;
  onClose: () => void;
}

export default function ChatInterface({ robot, onClose }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatLog[]>(robot.logs);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    
    setError(null);
    setIsLoading(true);

    try {
      const response = await sendMessageToOpenAI(
        user.id,
        robot.name,
        robot.instructions,
        robot.temperature,
        message.trim()
      );

      const newMessage: ChatLog = {
        id: crypto.randomUUID(),
        userId: user.id,
        message: message.trim(),
        response,
        timestamp: new Date().toISOString(),
      };

      addChatLog(robot.id, newMessage);
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue lors de l\'envoi du message');
      }
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#D7092E] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{robot.name}</h2>
          <p className="text-sm opacity-90">
            {window.location.origin}/robot/{robot.id}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          Fermer
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-4 flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Commencez la conversation avec {robot.name}</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#D7092E] text-white rounded-lg px-4 py-2 max-w-[80%]">
                  {msg.message}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                  {msg.response}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-[#D7092E] text-white px-6 py-2 rounded-md hover:bg-[#b8072a] transition-colors disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}