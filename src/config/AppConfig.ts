class AppConfig {
  public nodeEnv: string;
  public port: number;

  constructor() {
    this.nodeEnv = process.env.NODE_ENV || 'development';
    this.port = Number(process.env.PORT) || 3000;
  }
}

export default new AppConfig();
