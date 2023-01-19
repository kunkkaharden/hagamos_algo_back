import { RequestRole } from "./auth";
export const getPermits = (req: RequestRole)=> {
    return req.permitsData;
}