import { DataSource } from 'typeorm';
import { AppDatabase } from '../config/database';
import { User } from '../models/User';

export class UserService {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = AppDatabase.getDataSource();
  }

  async me(username: string) {
    const userRepo = this.dataSource.getRepository(User);
    return await userRepo.findOne({
      where: { username },
      select: ['id', 'username'],
    });
  }
}
