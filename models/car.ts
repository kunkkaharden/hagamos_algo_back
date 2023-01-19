import { Schema, model } from 'mongoose';

export interface ICar {
  car_plate: string;
  visible: boolean;
}

const carSchema = new Schema<ICar>({
  car_plate: { type: String, required: true, unique: true },
  visible: { type: Boolean, required: true, default: true},

});

export const Car = model<ICar>('Car', carSchema);