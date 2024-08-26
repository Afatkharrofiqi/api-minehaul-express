import express, { Router } from 'express';

import { App } from './App';
import { Database } from './configs/Database';
import { MqttConfig } from './configs/MqttConfig';
import { AuthController } from './controllers/AuthController';
import { MqttController } from './controllers/MqttController';
import { UserController } from './controllers/UserController';
import { ApiRouter } from './routes/ApiRouter';
import { AuthRoute } from './routes/v1/AuthRoute';
import { MqttRoute } from './routes/v1/MqttRoute';
import { UserRoute } from './routes/v1/UserRoute';
import { AuthService } from './services/AuthService';
import { MqttService } from './services/MqttService';
import { UserService } from './services/UserService';

export class Bootstrap {
  private db: Database;
  private mqttConfig: MqttConfig;

  constructor() {
    this.db = new Database();
    this.mqttConfig = new MqttConfig();
  }

  public init(): App {
    const router = Router();
    const dataSource = this.db.getDataSource();
    const authService = new AuthService(dataSource);
    const userService = new UserService(dataSource);
    const mqttService = new MqttService(this.mqttConfig.brokerUrl);

    const authController = new AuthController(authService);
    const userController = new UserController(userService);
    const mqttController = new MqttController(mqttService);

    const authRoute = new AuthRoute(authController, router);
    const userRoute = new UserRoute(userController, router);
    const mqttRoute = new MqttRoute(mqttController, router);

    const apiRouter = new ApiRouter(authRoute, userRoute, mqttRoute, router);

    const app = new App(express(), apiRouter, dataSource, mqttService);

    return app;
  }

  public start() {
    const app = this.init();
    app.serve();
  }
}

const bootstrap = new Bootstrap();
bootstrap.start();
