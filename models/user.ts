import { Schema, model } from 'mongoose';

export interface IUser {
  // id?: string;
  name: string;
  email: string;
  permits: string[];
  password: string;
  visible: boolean
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  permits: { type: [String], required: true },
  password: { type: String, required: true },
  visible: { type: Boolean, required: true, default: true},
});

export const User = model<IUser>('User', userSchema);