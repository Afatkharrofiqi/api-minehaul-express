import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}
