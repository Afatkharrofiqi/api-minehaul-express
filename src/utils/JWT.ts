import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../requests/AuthenticatedRequest';
import JWTConfig from '../config/JWTConfig';

export class JWT {
  // Generate an access token
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWTConfig.secret, {
      expiresIn: JWTConfig.tokenExpiry,
    });
  }

  // Generate a refresh token with a longer expiration time
  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, JWTConfig.refreshSecret, {
      expiresIn: JWTConfig.refreshTokenExpiry,
    });
  }

  // Verify an access token
  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, JWTConfig.secret) as TokenPayload;
    } catch {
      throw new Error('Invalid token');
    }
  }

  // Verify a refresh token
  static verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, JWTConfig.refreshSecret) as TokenPayload;
    } catch {
      throw new Error('Invalid refresh token');
    }
  }
}
