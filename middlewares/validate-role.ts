import { NextFunction, Request, Response } from "express";
import { getUser } from "util/get-user";
import { getPermits } from "../util/get-permits";

export const validateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const permits = getPermits(req);
  const user = getUser(req);

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  if (!permits) {
    next();
  }

  if (user.permits.includes(permits)) {
    next();
  }
 
  return res.status(403).json({
    message: "Not authorized",
  });
};
