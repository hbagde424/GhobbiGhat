import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JWTPayload, expiresIn?: string): string => {
  return (jwt as any).sign(payload, String(config.jwtSecret), {
    expiresIn: expiresIn || config.jwtExpire,
  });
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return (jwt as any).sign(payload, String(config.jwtRefreshSecret), {
    expiresIn: config.jwtRefreshExpire,
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return (jwt as any).verify(token, String(config.jwtSecret)) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return (jwt as any).verify(token, String(config.jwtRefreshSecret)) as JWTPayload;
};
