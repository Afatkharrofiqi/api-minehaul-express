import { Router } from 'express';
import { AuthController } from '../../controllers/AuthController';
import { RequestValidator } from '../../utils/RequestValidator';
import { loginSchema } from '../../requests/LoginRequest';
import { verifyTokenSchema } from '../../requests/VerifyTokenRequest';
import { registerSchema } from '../../requests/RegisterRequest';

class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
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
}

export default new AuthRoutes().router;
