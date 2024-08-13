export class JWTConfig {
  public static readonly secret: string =
    process.env.JWT_SECRET || 'default_access_secret';
  public static readonly refreshSecret: string =
    process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
  public static readonly tokenExpiry: string = process.env.JWT_EXPIRY || '1h';
  public static readonly refreshTokenExpiry: string =
    process.env.JWT_REFRESH_EXPIRY || '7d';
}
