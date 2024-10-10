import { NextFunction, Request, Response } from 'express';

export class RequestLogger {
  static log(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}
