import { DataSource } from 'typeorm';

import { User } from '../models/User';
import { DatabaseConfig } from './DatabaseConfig';

export class Database {
  private dataSource: DataSource;

  constructor(dbConfig: DatabaseConfig) {
    this.dataSource = new DataSource({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [User],
      synchronize: dbConfig.synchronize,
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
