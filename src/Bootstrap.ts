import express, { Router } from 'express';

import { App } from './App';
import { Database } from './configs/Database';
import { DatabaseConfig } from './configs/DatabaseConfig';
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
    this.db = new Database(new DatabaseConfig());
    this.mqttConfig = new MqttConfig();
  }

  public init(): App {
    const dataSource = this.db.getDataSource();
    const authService = new AuthService(dataSource);
    const userService = new UserService(dataSource);
    const mqttService = new MqttService(this.mqttConfig.brokerUrl);

    const authController = new AuthController(authService);
    const userController = new UserController(userService);
    const mqttController = new MqttController(mqttService);

    const authRoute = new AuthRoute(authController, Router());
    const userRoute = new UserRoute(userController, Router());
    const mqttRoute = new MqttRoute(mqttController, Router());

    const apiRouter = new ApiRouter(authRoute, userRoute, mqttRoute, Router());

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
