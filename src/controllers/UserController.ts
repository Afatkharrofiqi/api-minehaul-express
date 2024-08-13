import { Response } from 'express';

import { AuthenticatedRequest } from '../requests/AuthenticatedRequest';
import { UserService } from '../services/UserService';
import { ResponseHandler } from '../utils/ResponseHandler';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  async me(req: AuthenticatedRequest, res: Response) {
    try {
      const username = req.user?.username || '';
      const result = await this.userService.me(username);
      return ResponseHandler.success(
        res,
        result,
        'User retrieved successfully'
      );
    } catch (error) {
      return ResponseHandler.error(res, error, 'User retrieved failed');
    }
  }
}
