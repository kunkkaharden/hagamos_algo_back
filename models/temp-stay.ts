import { Schema, model } from 'mongoose';

export interface ITempStay {
  car_plate: string;
  start_date: Date;
}

const tempStaySchema = new Schema<ITempStay>({
  car_plate: { type: String, required: true, unique: true },
  start_date: { type: Date, required: true, default: new Date()},
});

export const TempStay = model<ITempStay>('Stay', tempStaySchema);