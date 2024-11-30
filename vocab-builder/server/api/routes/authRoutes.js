import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/login')
    .post(authController.login);
router
    .route('/register')
    .post(authController.register);
router
    .route('/checkToken')
    .get(verifyToken, authController.checkToken);


export default router;

