import express from 'express';
import * as userController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/users')
    .get(verifyToken, userController.list_all_users)
    .post(userController.create_user);
router
    .route('/users/:userId')
    .post(verifyToken, userController.delete_user)
    .put(verifyToken, userController.update_user);

router
    .route('/login')
    .post(userController.login);



export default router;

