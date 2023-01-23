import { NextFunction, Request, Response } from "express";
import { getUser } from "../util/get-user";
import { getPermits } from "../util/get-permits";

export const validateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const permits = getPermits(req);
  const user = getUser(req);

  if (!user ) {
    console.log("Not found userData in Request");
    return res.status(500).json({
      message: "Intenal Server Error",
    });
  }
 
  
  if (permits && !user.permits.includes(permits)) {
    return res.status(403).json({
      message: "Not authorized.",
    });
  }

  next();
};
