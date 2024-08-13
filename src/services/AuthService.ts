import { DataSource } from 'typeorm';
import { AppDatabase } from '../config/Database';
import { User } from '../models/User';
import { JWT } from '../utils/JWT';

export class AuthService {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = AppDatabase.getDataSource();
  }

  async register(username: string, password: string) {
    const userRepo = this.dataSource.getRepository(User);

    // Check if the user already exists
    const existingUser = await userRepo.findOneBy({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const user = new User();
    user.username = username;
    user.password = password;

    await userRepo.save(user);

    const accessToken = JWT.generateToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = JWT.generateRefreshToken({
      id: user.id,
      username: user.username,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(username: string, password: string) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOneBy({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = JWT.generateToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = JWT.generateRefreshToken({
      id: user.id,
      username: user.username,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = JWT.verifyRefreshToken(refreshToken);
      // Assuming the refresh token contains user ID and username
      const accessToken = JWT.generateToken({
        id: decoded.id,
        username: decoded.username,
      });
      return { accessToken };
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired, please log in again');
      }
      throw new Error('Invalid refresh token');
    }
  }
}
