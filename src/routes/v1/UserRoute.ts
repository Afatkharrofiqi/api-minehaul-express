import { Router } from 'express';

import { UserController } from '../../controllers/UserController';
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';

export class UserRoute {
  constructor(
    private readonly userController: UserController,
    private readonly router: Router
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', AuthMiddleware.verifyToken, this.userController.me);
  }

  public getRouter() {
    return this.router;
  }
}
