class JWTConfig {
  public secret: string;
  public refreshSecret: string;
  public tokenExpiry: string;
  public refreshTokenExpiry: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'default_access_secret';
    this.refreshSecret =
      process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
    this.tokenExpiry = process.env.JWT_EXPIRY || '1h';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
  }
}

export default new JWTConfig();
