import express, { Application, Request, Response } from 'express';

import { AppConfig } from './configs/AppConfig';
import { Database } from './configs/Database';
import { RequestLogger } from './middlewares/RequestLogger';
import { ApiRouter } from './routes/ApiRouter';
import { MqttService } from './services/MqttService';

export class App {
  constructor(
    private readonly app: Application,
    private readonly apiRouter: ApiRouter,
    private readonly dataSource: Database,
    private readonly mqttService: MqttService
  ) {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  private initializeMiddlewares(): void {
    this.app.use(RequestLogger.log);
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.get('/', this.handleRootRoute);
    this.app.use('/api', this.apiRouter.getRouter());
  }

  private handleRootRoute(req: Request, res: Response): void {
    res.send('Welcome to the API Minehaul');
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await this.dataSource.connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }

  public serveMqtt(): void {
    this.mqttService.listen();
  }

  public serve() {
    this.app.listen(AppConfig.port, () => {
      console.log(`Server is running on port ${AppConfig.port}`);
    });
  }
}
