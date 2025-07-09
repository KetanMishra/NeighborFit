import { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  passwordHash: string;
  email: string;
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export interface Neighborhood extends Document {
  name: string;
  description: string;
}

export const NeighborhoodSchema = new Schema<Neighborhood>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}); 