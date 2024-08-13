import express, { Application, Request, Response } from 'express';
import { AppDatabase } from './config/Database';
import { RequestLogger } from './middlewares/RequestLogger';
import ApiRouter from './routes/ApiRouter';
import MqttService from './services/MqttService';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
    this.initializeMqtt();
  }

  private initializeMiddlewares(): void {
    this.app.use(RequestLogger.log);
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.get('/', this.handleRootRoute);
    this.app.use('/api', ApiRouter);
  }

  private handleRootRoute(req: Request, res: Response): void {
    res.send('Welcome to the API Minehaul');
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDatabase.initialize();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }

  private initializeMqtt(): void {
    const mqttService = new MqttService();
    mqttService.getClient().on('message', (topic: string, message: Buffer) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
    });
  }
}

export default new App().app;
