/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// Interface for the JWT Payload, based on IUser
export interface IUserPayload extends JwtPayload {
  id: string;
  role: string;
  isVerified: boolean;
  premiumAccess: boolean;
}

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }

    const token = authHeader.split(" ")[1];

    // Check if the token is valid
    jwt.verify(token, config.jwt_access_screet as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }

      const user = decoded as IUserPayload;

      // Role check
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You do not have permission to access this route",
        });
      }

      // Attach user data to the request object
      req.user = user;
      next();
    });
  });
};

export default auth;
