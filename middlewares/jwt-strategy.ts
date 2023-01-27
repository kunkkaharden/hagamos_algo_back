import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
export const jwtStrategy = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            message: 'Not authenticated',
        });
    }

    try {
        const  decoded  = verify(token, process.env.SECRET_JWT);

    } catch (error) {
        return res.status(401).json({
            message: 'Not authenticated',
        })
        
    }

    next();
}
