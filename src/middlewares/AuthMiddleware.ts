import { Response, NextFunction } from 'express';
import { JWT } from '../utils/JWT';
import { AuthenticatedRequest } from '../requests/AuthenticatedRequest';
import { ResponseHandler } from '../utils/ResponseHandler';

export class AuthMiddleware {
  static verifyToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers['authorization'];
    try {
      if (!token) {
        throw new Error('Missing header authorization');
      }

      const decoded = JWT.verifyToken(token.split(' ')[1]);
      req.user = decoded;
      next();
    } catch (error) {
      return ResponseHandler.error(res, error, 'Unauthorized', 403);
    }
  }
}
