import { Request, Response, NextFunction } from "express";

export interface IjwtValidation {
  validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void>;
}
