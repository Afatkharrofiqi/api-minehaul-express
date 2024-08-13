import { Router } from 'express';
import MqttRoute from './v1/MqttRoute';
import AuthRoute from './v1/AuthRoute';
import UserRoute from './v1/UserRoute';

class ApiRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/v1/auth', AuthRoute);
    this.router.use('/v1/user', UserRoute);
    this.router.use('/v1/mqtt', MqttRoute);
  }
}

export default new ApiRouter().router;
