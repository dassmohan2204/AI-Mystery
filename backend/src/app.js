import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import mysteryRoutes from './routes/mystery.routes.js';
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '32kb' }));
app.use('/api/', rateLimit({ windowMs: 60_000, limit: 40, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
  success: mongoose.connection.readyState === 1,
  status: 'ok',
  database: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
}));
app.use('/api/v1', (_req, res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  return res.status(503).json({ success: false, message: 'Database is not connected. Check MongoDB Atlas network access and MONGODB_URI in backend/.env.' });
});
app.use('/api/v1/mysteries', mysteryRoutes);
app.use((err, _req, res, _next) => { console.error(err); res.status(err.status || 500).json({ success: false, message: err.status ? err.message : 'Something went wrong. Please try again.' }); });
export default app;
