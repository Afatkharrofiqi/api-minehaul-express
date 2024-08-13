import { Router } from 'express';
import MqttController from '../../controllers/MqttController';

class MqttRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/subscribe', MqttController.subscribeToTopic);
    this.router.post('/publish', MqttController.publishToTopic);
  }
}

export default new MqttRoutes().router;
