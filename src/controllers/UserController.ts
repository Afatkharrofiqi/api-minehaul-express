import { Response } from 'express';
import { BaseController } from './BaseController';
import { ResponseHandler } from '../utils/ResponseHandler';
import { UserService } from '../services/UserService';
import { AuthenticatedRequest } from '../requests/AuthenticatedRequest';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
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
