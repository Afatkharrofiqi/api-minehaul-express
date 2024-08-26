import { DataSource } from 'typeorm';

import { User } from '../models/User';

export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async me(username: string) {
    const userRepo = this.dataSource.getRepository(User);
    return await userRepo.findOne({
      where: {
        username,
      },
      relations: [
        'groups.roles.permissions',
        'roles.permissions',
        'permissions',
      ],
    });
  }
}
