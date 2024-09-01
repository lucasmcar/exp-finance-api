import { Request } from 'express';
import { Usuario } from '../models/usuario';
import express  from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // ou defina um tipo mais específico se necessário
    }
  }
}