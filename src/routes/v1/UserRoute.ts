import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';

class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', AuthMiddleware.verifyToken, this.userController.me);
  }
}

export default new UserRoutes().router;
