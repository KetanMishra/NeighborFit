import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './auth';
import neighborhoodsRouter from './neighborhoods';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neighborfit';

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/neighborhoods', neighborhoodsRouter);

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('NeighborFit backend is running!');
});

// Global error handler (must be after all other middleware and routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 