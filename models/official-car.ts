import { Schema, Types } from 'mongoose';
import {Car, ICar} from './car'
const baseOptions = {
  discriminatorKey: "__type",
};
export interface IOfficialCar extends ICar{
  stays: Types.ObjectId[];
}

const officialSchema = new Schema<IOfficialCar>({
  stays: { type: [Schema.Types.ObjectId], ref: 'Stay'}
}, baseOptions); 


export const OfficialCar = Car.discriminator<IOfficialCar>('OfficialCar',  officialSchema);
