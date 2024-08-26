import { DataSource } from 'typeorm';

import { User } from '../models/User';

export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async me(username: string) {
    const userRepo = this.dataSource.getRepository(User);
    const result = await userRepo.findOne({
      where: {
        username,
      },
      relations: [
        'groups.roles.permissions',
        'roles.permissions',
        'permissions',
      ],
    });

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }
}
