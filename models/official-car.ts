import { Schema } from 'mongoose';
import {Car, ICar} from './car'
const baseOptions = {
  discriminatorKey: "__type",
};
export interface IOfficialCar extends ICar{
}

const officialSchema = new Schema<IOfficialCar>({
}, baseOptions); 


export const OfficialCar = Car.discriminator<IOfficialCar>('OfficialCar',  officialSchema);
