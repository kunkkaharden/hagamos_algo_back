import { sign } from 'jsonwebtoken';
import { Payload } from './payload.interface';
export const generateJwt = (payload: Payload) => {
    return sign(payload, process.env.SECRET_JWT);
}