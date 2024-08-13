import { Router } from 'express';

import { AuthController } from '../../controllers/AuthController';
import { loginSchema } from '../../requests/LoginRequest';
import { registerSchema } from '../../requests/RegisterRequest';
import { verifyTokenSchema } from '../../requests/VerifyTokenRequest';
import { RequestValidator } from '../../utils/RequestValidator';

export class AuthRoute {
  constructor(
    private readonly authController: AuthController,
    private readonly router: Router
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/register',
      RequestValidator.validate(registerSchema),
      this.authController.register
    );
    this.router.post(
      '/login',
      RequestValidator.validate(loginSchema),
      this.authController.login
    );
    this.router.post(
      '/refresh-token',
      RequestValidator.validate(verifyTokenSchema),
      this.authController.refreshToken
    );
  }

  public getRouter() {
    return this.router;
  }
}
