import express from 'express';
import { AppDatabase } from './config/database';
import routes from './routes';
import { RequestLogger } from './middlewares/RequestLogger';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(RequestLogger.log);
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.get('/', (req, res) => {
      res.send('Welcome to the API Minehaul');
    });
    this.app.use('/api', routes);
  }

  private async initializeDatabase() {
    try {
      await AppDatabase.initialize();
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
}

export default new App().app;
