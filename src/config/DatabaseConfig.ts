class DatabaseConfig {
  public type: 'postgres';
  public host: string;
  public port: number;
  public username: string;
  public password: string;
  public database: string;
  public synchronize: boolean;

  constructor() {
    this.type = 'postgres';
    this.host = process.env.DB_HOST || 'localhost';
    this.port = Number(process.env.DB_PORT) || 5432;
    this.username = process.env.DB_USERNAME || 'default_user';
    this.password = String(process.env.DB_PASSWORD) || 'default_password';
    this.database = process.env.DB_NAME || 'default_db';
    this.synchronize = process.env.DB_SYNCHRONIZE === 'true'; // Ensure this is false in production
  }
}

export default new DatabaseConfig();
