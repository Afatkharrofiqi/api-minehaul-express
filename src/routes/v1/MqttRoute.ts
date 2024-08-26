import { Router } from 'express';

import { MqttController } from '../../controllers/MqttController';
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';

export class MqttRoute {
  constructor(
    private readonly mqttController: MqttController,
    private readonly router: Router
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/subscribe',
      AuthMiddleware.verifyToken,
      this.mqttController.subscribeToTopic
    );
    this.router.post(
      '/publish',
      AuthMiddleware.verifyToken,
      this.mqttController.publishToTopic
    );
  }

  public getRouter() {
    return this.router;
  }
}
