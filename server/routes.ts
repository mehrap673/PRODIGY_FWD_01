import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(cookieParser());
  
  const { connectDB } = await import('./config/db.js');
  const authRoutes = await import('./routes/auth.js');
  const protectedRoutes = await import('./routes/protected.js');
  
  await connectDB();
  
  app.use('/api/auth', authRoutes.default);
  app.use('/api', protectedRoutes.default);

  const httpServer = createServer(app);

  return httpServer;
}
