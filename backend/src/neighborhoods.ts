import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NeighborhoodSchema, Neighborhood as NeighborhoodType } from './types';

const router = express.Router();
const Neighborhood = mongoose.model<NeighborhoodType>('Neighborhood', NeighborhoodSchema);

// GET all neighborhoods with optional filters
router.get('/', async (req: Request, res: Response) => {
  const filters: any = {};
  // Example filters: ?minRent=20000&maxRent=50000&minWalkScore=70
  if (req.query.minRent || req.query.maxRent) {
    filters['housing.rentPrice'] = {};
    if (req.query.minRent) filters['housing.rentPrice'].$gte = Number(req.query.minRent);
    if (req.query.maxRent) filters['housing.rentPrice'].$lte = Number(req.query.maxRent);
  }
  if (req.query.minWalkScore) {
    filters['amenities.walkScore'] = { $gte: Number(req.query.minWalkScore) };
  }
  if (req.query.minTransitScore) {
    filters['amenities.transitScore'] = { $gte: Number(req.query.minTransitScore) };
  }
  if (req.query.minSafetyScore) {
    filters['safety.safetyScore'] = { $gte: Number(req.query.minSafetyScore) };
  }
  // Add more filters as needed
  const neighborhoods = await Neighborhood.find(filters);
  res.json(neighborhoods);
});

export default router; 