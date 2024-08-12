import { Router } from 'express';
import { AuthRoutes } from './v1/AuthRoute';
import { UserRoutes } from './v1/UserRoute';

const router = Router();

// Instantiate AuthRoutes and use its router
const authRoutes = new AuthRoutes();
const userRoutes = new UserRoutes();
router.use('/v1/auth', authRoutes.router);
router.use('/v1/user', userRoutes.router);

export default router;
