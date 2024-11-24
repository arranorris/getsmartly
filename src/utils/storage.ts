import { User, Robot, ChatLog, Stats } from '../types';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'getsmartly_users',
  ROBOTS: 'getsmartly_robots',
  SETTINGS: 'getsmartly_settings',
};

// User Management
export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingUserIndex = users.findIndex(u => u.id === user.id);
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// Robot Management
export const getRobots = (): Robot[] => {
  const robots = localStorage.getItem(STORAGE_KEYS.ROBOTS);
  return robots ? JSON.parse(robots) : [];
};

export const getRobotById = (id: string): Robot | undefined => {
  return getRobots().find(robot => robot.id === id);
};

export const saveRobot = (robot: Robot): void => {
  const robots = getRobots();
  const existingRobotIndex = robots.findIndex(r => r.id === robot.id);
  
  if (existingRobotIndex >= 0) {
    robots[existingRobotIndex] = robot;
  } else {
    robots.push(robot);
  }
  
  localStorage.setItem(STORAGE_KEYS.ROBOTS, JSON.stringify(robots));
};

export const deleteRobot = (robotId: string): void => {
  const robots = getRobots().filter(r => r.id !== robotId);
  localStorage.setItem(STORAGE_KEYS.ROBOTS, JSON.stringify(robots));
};

// Chat Logs
export const addChatLog = (robotId: string, log: ChatLog): void => {
  const robots = getRobots();
  const robot = robots.find(r => r.id === robotId);
  
  if (robot) {
    robot.logs = robot.logs || [];
    robot.logs.push(log);
    robot.lastActive = new Date().toISOString();
    saveRobot(robot);
  }
};

// Stats
export const getStats = (): Stats => {
  const robots = getRobots();
  const logs = robots.flatMap(robot => robot.logs);
  const uniqueUserIds = new Set(logs.map(log => log.userId));

  return {
    activeRobots: robots.length,
    totalMessages: logs.length,
    uniqueUsers: uniqueUserIds.size,
  };
};

// Settings
interface UserSettings {
  apiKey: string;
  defaultTemperature: number;
  language: string;
}

export const getSettings = (userId: string): UserSettings => {
  const settings = localStorage.getItem(`${STORAGE_KEYS.SETTINGS}_${userId}`);
  return settings ? JSON.parse(settings) : {
    apiKey: '',
    defaultTemperature: 0.7,
    language: 'fr',
  };
};

export const saveSettings = (userId: string, settings: Partial<UserSettings>): void => {
  const currentSettings = getSettings(userId);
  const updatedSettings = { ...currentSettings, ...settings };
  localStorage.setItem(`${STORAGE_KEYS.SETTINGS}_${userId}`, JSON.stringify(updatedSettings));
};