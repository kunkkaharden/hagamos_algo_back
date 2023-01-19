import { RequestRole } from "../middlewares/auth";
export const getPermits = (req: RequestRole)=> {
    return req.permitsData;
}