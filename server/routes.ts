import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

export async function registerRoutes(app: Express): Promise<Server> {
  require('dotenv').config();
  
  app.use(cookieParser());
  
  await connectDB();
  
  app.use('/api/auth', authRoutes);
  app.use('/api', protectedRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
