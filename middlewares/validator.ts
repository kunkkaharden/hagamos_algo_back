import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";

export const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            data: errors.mapped()
        });
    }

    next();
}