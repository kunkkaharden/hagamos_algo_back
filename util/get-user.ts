import { RequestUser } from "middlewares/validate-jwt"
export const getUser = (req: RequestUser)=> {
    return req.userData;
}