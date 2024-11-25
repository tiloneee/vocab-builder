import express from 'express';
import * as userController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/users')
    .get(verifyToken, userController.list_all_users)
router
    .route('/users/:userId')
    .post(verifyToken, userController.delete_user)
    .put(verifyToken, userController.update_user);

router
    .route('/auth/login')
    .post(userController.login);
router
    .route('/auth/register')
    .post(userController.register);



export default router;

