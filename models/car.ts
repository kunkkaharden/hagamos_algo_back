import { Schema, model } from 'mongoose';

export interface ICar {
  id?: string;
  car_plate: string;
}

const userSchema = new Schema<ICar>({
  car_plate: { type: String, required: true, unique: true },
});

export const User = model<ICar>('User', userSchema);