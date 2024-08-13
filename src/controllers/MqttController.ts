import { Request, Response } from 'express';
import MqttService from '../services/MqttService';
import { ResponseHandler } from '../utils/ResponseHandler';
import { BaseController } from './BaseController';

class MqttController extends BaseController {
  private mqttService: MqttService;

  constructor() {
    super();
    this.mqttService = new MqttService();
  }

  public subscribeToTopic(req: Request, res: Response): void {
    const topic = req.body.topic;
    this.mqttService.subscribe(topic);
    ResponseHandler.success(res, null, `Subscribed to topic: ${topic}`, 200);
  }

  public publishToTopic(req: Request, res: Response): void {
    const topic = req.body.topic;
    const message = req.body.message;
    this.mqttService.publish(topic, message);
    ResponseHandler.success(
      res,
      null,
      `Publish to topic: ${topic} with message: ${message}`,
      200
    );
  }
}

export default new MqttController();
