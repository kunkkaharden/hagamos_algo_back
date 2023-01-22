import { Schema, model, Document } from 'mongoose';

const baseOptions = {
  discriminatorKey: '__type',
}

export interface ICar extends Document {
  __type: string;
  car_plate: string;
  active: boolean;
}

const carSchema = new Schema<ICar>({
  car_plate: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true, default: true},

}, baseOptions);

export const Car = model<ICar>('Car', carSchema);