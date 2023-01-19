import { NextFunction, Request, Response } from "express";
import { jwtStrategy } from "../middlewares/jwt-strategy";
import { validateRole } from "../middlewares/validate-role";
import { ValidRoles } from "./ValidRoles";

export const auth = (role: ValidRoles = null) => {
  return [
    jwtStrategy,
    setRole(role),
    validateRole,
  ];
};

const setRole = (role: ValidRoles | null) => {
  const setPermition = (
    req: RequestRole,
    res: Response,
    next: NextFunction
  ) => {
    role && (req.permitsData = role);
    next();
  };

  return setPermition;
};

export interface RequestRole extends Request {
  permitsData?: string;
}
