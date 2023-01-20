import { Schema, model, Types } from 'mongoose';

export interface IStay {
  car_plate: string;
  start_date: Date;
  end_date: Date;
  car: Types.ObjectId;
  visible: boolean;

}

const staySchema = new Schema<IStay>({
  car_plate: { type: String, required: true },
  visible: { type: Boolean, required: true, default: true},
  start_date: { type: Date, required: true, default: new Date()},
  end_date: { type: Date, required: true, default: new Date()},
  car: { type: Schema.Types.ObjectId, ref: 'car'},

});

export const Stay = model<IStay>('Stay', staySchema);