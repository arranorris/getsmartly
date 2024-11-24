import { hash, compare } from 'bcryptjs';
import * as jose from 'jose';
import { z } from 'zod';

const SALT_ROUNDS = 12;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Store login attempts in memory (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Input validation schemas
export const userSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return compare(password, hashedPassword);
};

// JWT token management
export const generateToken = async (payload: {
  userId: string;
  isAdmin: boolean;
}): Promise<string> => {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error('Token invalide');
  }
};

// Brute force protection
export const checkLoginAttempts = (email: string): boolean => {
  const attempt = loginAttempts.get(email);
  if (!attempt) return true;

  const timeSinceLastAttempt = Date.now() - attempt.lastAttempt;
  if (timeSinceLastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(email);
    return true;
  }

  return attempt.count < MAX_LOGIN_ATTEMPTS;
};

export const recordLoginAttempt = (email: string, success: boolean) => {
  const attempt = loginAttempts.get(email) || { count: 0, lastAttempt: 0 };

  if (success) {
    loginAttempts.delete(email);
  } else {
    loginAttempts.set(email, {
      count: attempt.count + 1,
      lastAttempt: Date.now(),
    });
  }
};

// XSS Prevention
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};