import { Schema } from 'mongoose';
import { Car, ICar } from './car';

const baseOptions = {
    discriminatorKey: '__type',
}
export interface IResidentCar extends ICar {
  time: number
}

const residentSchema = new Schema<IResidentCar>({
  time: { type: Number, required: true, default: 0},
}, baseOptions);

export const ResidentCar = Car.discriminator<IResidentCar>('ResidentCar', residentSchema);