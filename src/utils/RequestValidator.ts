import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { ResponseHandler } from './ResponseHandler';

export class RequestValidator {
  static validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        ResponseHandler.error(res, error, 'Validation failed', 400);
      }
    };
  }
}
