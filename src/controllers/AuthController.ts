import { Response } from 'express';

import { LoginRequest } from '../requests/LoginRequest';
import { RegisterRequest } from '../requests/RegisterRequest';
import { VerifyTokenRequest } from '../requests/VerifyTokenRequest';
import { AuthService } from '../services/AuthService';
import { ResponseHandler } from '../utils/ResponseHandler';
import { BaseController } from './BaseController';

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async register(req: RegisterRequest, res: Response) {
    try {
      const result = await this.authService.register(
        req.body.username,
        req.body.password
      );
      return ResponseHandler.success(
        res,
        result,
        'User registered successfully'
      );
    } catch (error) {
      return ResponseHandler.error(res, error, 'Registration failed');
    }
  }

  async login(req: LoginRequest, res: Response) {
    try {
      const result = await this.authService.login(
        req.body.username,
        req.body.password
      );
      return ResponseHandler.success(res, result, 'Login successful');
    } catch (error) {
      return ResponseHandler.error(res, error, 'Login failed', 401);
    }
  }

  async refreshToken(req: VerifyTokenRequest, res: Response) {
    try {
      const result = await this.authService.refreshToken(req.body.refreshToken);
      return ResponseHandler.success(res, result, 'New access token generated');
    } catch (error) {
      return ResponseHandler.error(res, error, 'Refresh token failed', 401);
    }
  }
}
