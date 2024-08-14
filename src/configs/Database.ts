import { DataSource } from 'typeorm';

import { User } from '../models/User';
import { DatabaseConfig } from './DatabaseConfig';

export class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: DatabaseConfig.type,
      host: DatabaseConfig.host,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [User],
      synchronize: DatabaseConfig.synchronize,
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
