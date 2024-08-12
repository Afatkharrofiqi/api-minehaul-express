import { Response } from 'express';
import { AuthService } from '../services/AuthService';
import { BaseController } from './BaseController';
import { ResponseHandler } from '../utils/ResponseHandler';
import { LoginRequest } from '../requests/LoginRequest';
import { VerifyTokenRequest } from '../requests/VerifyTokenRequest';
import { RegisterRequest } from '../requests/RegisterRequest';

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
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
