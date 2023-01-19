import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "util/payload.interface";
import { IUser, User } from "../models/user";
export const jwtStrategy = async(req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            message: 'Not authenticated',
        });
    }

    try {
        const  decoded  = verify(token, process.env.SECRET_JWT);
        const id = (decoded as Payload).id
        const user = await User.findOne({ _id: id, visible: true});
        
        if(!user) {
            return res.status(401).json({
                message: 'Not authenticated',
            }) 
        }

        req.userData = {
            id: user.id,
            name: user.name,
            permits: user.permits,
            email: user.email,
        };
    } catch (error) {
        return res.status(401).json({
            message: 'Not authenticated',
        })
        
    }

    next();
}


export interface RequestUser extends Request {
    userData?: Partial<IUser>;
}

