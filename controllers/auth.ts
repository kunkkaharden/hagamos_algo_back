import { Request, Response } from "express";
export const register = (req: Request, res: Response) => {

    

    return res.json({ok: true, msg: "register"});
}

export const login = (req: Request, res: Response) => {

  
    return res.json({ok: true, msg: "login"});
}

export const renew = (req: Request, res: Response) => {
    return res.json({ok: true, msg: "renew"});
}