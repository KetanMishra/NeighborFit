import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { UserSchema, User as UserType } from './types';
import { asyncHandler } from './utils/asyncHandler';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const User = mongoose.model<UserType>('User', UserSchema);

// Signup
router.post('/signup', asyncHandler(async (req: Request, res: Response) => {
  console.log('Signup request body:', req.body);
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, email, and password required' });
  }
  const existingUser = await User.findOne({ $or: [ { username }, { email } ] });
  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(409).json({ message: 'Username already exists' });
    } else {
      return res.status(409).json({ message: 'Email already exists' });
    }
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, passwordHash, email });
  await user.save();
  res.status(201).json({ message: 'User created' });
}));

// Login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: 'Username/email and password required' });
  }
  // identifier can be username or email
  const user = await User.findOne({ $or: [ { username: identifier }, { email: identifier } ] });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username: user.username, email: user.email });
}));

export default router; 