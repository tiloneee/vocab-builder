import express from 'express';
import * as userController from '../controllers/authController.js';

const router = express.Router();

router
    .route('/users')
    .get(userController.list_all_users)
    .post(userController.create_user);
router
    .route('/users/:userId')
    .post(userController.delete_user)
    .put(userController.update_user);

router
    .route('/login')
    .post(userController.login);



export default router;

