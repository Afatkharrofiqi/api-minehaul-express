import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../requests/AuthenticatedRequest';

export class JWT {
  // Generate an access token
  static generateToken(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_access_secret',
      { expiresIn }
    );
  }

  // Generate a refresh token with a longer expiration time
  static generateRefreshToken(
    payload: object,
    expiresIn: string = '7d'
  ): string {
    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
      { expiresIn }
    );
  }

  // Verify an access token
  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_access_secret'
      ) as TokenPayload;
    } catch {
      throw new Error('Invalid token');
    }
  }

  // Verify a refresh token
  static verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'default_refresh_secret'
      ) as TokenPayload;
    } catch {
      throw new Error('Invalid refresh token');
    }
  }
}
