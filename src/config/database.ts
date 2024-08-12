import { DataSource } from 'typeorm';
import { User } from '../models/User';

class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, // Disable in production
    });
  }

  public async initialize() {
    try {
      await this.dataSource.initialize();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Error during database connection:', error);
      throw error;
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export const AppDatabase = new Database();
