import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database';
import godRoutes from './routes/godRoutes';
import itemRoutes from './routes/itemRoutes';
import buildRoutes from './routes/buildRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Smite 2 Stats API is running!' });
});

app.use('/api/gods', godRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/builds', buildRoutes);

// Test database connection route
app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});