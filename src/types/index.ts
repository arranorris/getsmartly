export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Robot {
  id: string;
  name: string;
  temperature: number;
  instructions: string;
  logs: ChatLog[];
  createdAt: string;
  lastActive: string | null;
}

export interface ChatLog {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: string;
}

export interface Stats {
  activeRobots: number;
  totalMessages: number;
  uniqueUsers: number;
}