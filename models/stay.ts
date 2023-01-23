import { Schema, model, Document } from 'mongoose';

export interface IStay extends Document {
  car_plate: string;
  start_date: Date;
  end_date: Date;
  active: boolean;

}

const staySchema = new Schema<IStay>({
  car_plate: { type: String, required: true },
  active: { type: Boolean, required: true,  default: true},
  start_date: { type: Date, required: true},
  end_date: { type: Date, default: null},

});

export const Stay = model<IStay>('Stay', staySchema);