import { DataSource } from 'typeorm';

import { Group } from '../models/Group';
import { Menu } from '../models/Menu';
import { Permission } from '../models/Permission';
import { Role } from '../models/Role';
import { User } from '../models/User';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'fatkha',
  password: 'pass',
  database: 'minehaul_express',
  entities: [User, Role, Permission, Group, Menu],
  synchronize: true,
});

async function SeedDatabase() {
  await AppDataSource.initialize();

  // Truncate all tables
  await AppDataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  await AppDataSource.query('TRUNCATE TABLE "role" RESTART IDENTITY CASCADE');
  await AppDataSource.query(
    'TRUNCATE TABLE "permission" RESTART IDENTITY CASCADE'
  );
  await AppDataSource.query('TRUNCATE TABLE "group" RESTART IDENTITY CASCADE');
  await AppDataSource.query('TRUNCATE TABLE "menu" RESTART IDENTITY CASCADE');

  const permissionRepository = AppDataSource.getRepository(Permission);
  const roleRepository = AppDataSource.getRepository(Role);
  const groupRepository = AppDataSource.getRepository(Group);
  const userRepository = AppDataSource.getRepository(User);
  const menuRepository = AppDataSource.getRepository(Menu); // Get the Menu repository

  // Create Permissions
  const readPermission = permissionRepository.create({
    name: 'READ',
    description: 'Read permission',
  });
  const writePermission = permissionRepository.create({
    name: 'WRITE',
    description: 'Write permission',
  });
  const deletePermission = permissionRepository.create({
    name: 'DELETE',
    description: 'Delete permission',
  });
  await permissionRepository.save([
    readPermission,
    writePermission,
    deletePermission,
  ]);

  // Create Roles
  const adminRole = roleRepository.create({
    name: 'Admin',
    description: 'Administrator role',
    permissions: [readPermission, writePermission],
  });
  await roleRepository.save(adminRole);
  const operatorRole = roleRepository.create({
    name: 'Operator',
    description: 'Operator role',
    permissions: [readPermission],
  });
  await roleRepository.save(operatorRole);

  // Create Groups
  const adminGroup = groupRepository.create({
    name: 'Admins',
    description: 'Group of administrators',
    roles: [adminRole],
  });
  await groupRepository.save(adminGroup);
  const marketingGroup = groupRepository.create({
    name: 'Marketings',
    description: 'Group of marketings',
    roles: [operatorRole],
  });
  await groupRepository.save(marketingGroup);

  // Create Menus
  const dashboardMenu = menuRepository.create({
    name: 'Dashboard',
    url: '/dashboard',
    roles: [adminRole],
  });
  const settingsMenu = menuRepository.create({
    name: 'Settings',
    url: '/settings',
    roles: [adminRole],
  });
  await menuRepository.save([dashboardMenu, settingsMenu]);

  // Create Users and Assign Roles, Permissions, Groups
  const adminUser = userRepository.create({
    username: 'admin',
    password: 'pass', // Provide plain text password
    email: 'admin@example.com',
    roles: [adminRole],
    groups: [adminGroup],
    permissions: [readPermission, writePermission, deletePermission],
  });

  const user1 = userRepository.create({
    username: 'user1',
    password: 'pass', // Provide plain text password
    email: 'user1@example.com',
    groups: [marketingGroup],
  });

  await userRepository.save(adminUser);
  await userRepository.save(user1);

  await AppDataSource.destroy();
}

SeedDatabase().catch((error) =>
  console.error('Error seeding database:', error)
);
