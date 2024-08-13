import { Router } from 'express';

import { AuthRoute } from './v1/AuthRoute';
import { MqttRoute } from './v1/MqttRoute';
import { UserRoute } from './v1/UserRoute';

export class ApiRouter {
  constructor(
    private readonly authRoute: AuthRoute,
    private readonly userRoute: UserRoute,
    private readonly mqttRoute: MqttRoute,
    private readonly router: Router
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/v1/auth', this.authRoute.getRouter());
    this.router.use('/v1/user', this.userRoute.getRouter());
    this.router.use('/v1/mqtt', this.mqttRoute.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
