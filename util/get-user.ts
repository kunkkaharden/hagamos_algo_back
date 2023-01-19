import { RequestUser } from "middlewares/jwt-strategy"
export const getUser = (req: RequestUser)=> {
    return req.userData;
}