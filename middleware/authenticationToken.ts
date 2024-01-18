import jwt from "jsonwebtoken";
import { Request as ExpressRequest, NextFunction, Response } from "express";

interface Request extends ExpressRequest {
  user?: unknown;
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);

  if (token == null) return res.sendStatus(401);

  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY must be set");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default authenticateToken;
