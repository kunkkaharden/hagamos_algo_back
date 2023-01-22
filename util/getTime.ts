import { IStay } from "../models/stay";

export const getTime = (stay: IStay) => {
    return Math.trunc((stay.end_date.getTime() - stay.start_date.getTime()) / 1000 / 60); 
}