import { Router } from 'express';

import { MqttController } from '../../controllers/MqttController';

export class MqttRoute {
  constructor(
    private readonly mqttController: MqttController,
    private readonly router: Router
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/subscribe', this.mqttController.subscribeToTopic);
    this.router.post('/publish', this.mqttController.publishToTopic);
  }

  public getRouter() {
    return this.router;
  }
}
