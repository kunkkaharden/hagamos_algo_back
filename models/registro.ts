import { Schema, model } from 'mongoose';

export interface IRegistro {
  enlace: string;
  categoria: string;
  temporal: boolean
  fecha: Date;
}

const registroSchema = new Schema<IRegistro>({
  enlace: { type: String, required: true, unique: true },
  categoria: { type: String, required: true },
  temporal: { type: Boolean, required: true, default: false},
  fecha: { type: Date, required: true },
});

export const Registro = model<IRegistro>('Registro', registroSchema);