import path from 'path';
import { DataSource } from 'typeorm';

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
      entities: [path.join(__dirname, '../models/*.{ts,js}')],
      synchronize: DatabaseConfig.synchronize,
    });
  }

  public async connect() {
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
