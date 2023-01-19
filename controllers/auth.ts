import { Request, Response } from "express";
import {genSaltSync, hashSync, compareSync} from 'bcryptjs';
import {IUser, User} from '../models/user';
import { generateJwt } from "../util/jwt";
import { getUser } from "../util/get-user";
export const register = async (req: Request, res: Response) => {

    const {name, email, password}: IUser = req.body; 

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        user = new User({...req.body, visible: true});
        user.password = hashSync(password, genSaltSync(10));
        user.save();
        return res.status(200).json({
            _id: user._id,
            name,
            email,
            token: generateJwt({_id: user._id}),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const login = async(req: Request, res: Response) => {
    const {email, password}: IUser = req.body; 
   
    try {
        const user = await User.findOne({email, visible: true});
        if (!user) {
            return res.status(400).json({
                message: "The email and passwords are incorrect",
            });
        }

        if (!compareSync(password, user.password)) {
            return res.status(400).json({
                message: "The email and passwords are incorrect",
            });
        }
    
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email,
            token: generateJwt({_id: user._id}),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const renew = (req: Request, res: Response) => {
   const user = getUser(req);
   return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateJwt({_id: user._id}),
});
}