import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { getUsers, saveUser } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = getUsers();
      if (users.some(u => u.email === email)) {
        throw new Error('Cet email est déjà utilisé');
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        isAdmin: email.includes('admin'),
      };

      saveUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Identifiants invalides');
      }

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}