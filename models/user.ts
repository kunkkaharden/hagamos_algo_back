import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  permits: string[];
  password: string;
  active: boolean
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  permits: { type: [String], required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: true},
});

export const User = model<IUser>('User', userSchema);