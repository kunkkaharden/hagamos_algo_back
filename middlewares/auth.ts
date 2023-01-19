import { NextFunction, Request, Response } from "express";
import { jwtStrategy } from "./jwt-strategy";
import { validateRole } from "./validate-role";

export const auth = (role: string) => {
  return [
    jwtStrategy,
    setRole(role),
    validateRole,
  ];
};

const setRole = (role: string) => {
  const setPermition = (
    req: RequestRole,
    res: Response,
    next: NextFunction
  ) => {
    // req.permitsData = role;
    next();
  };

  return setPermition;
};

export interface RequestRole extends Request {
  permitsData?: string;
}
