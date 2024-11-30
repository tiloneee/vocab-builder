import express from 'express';
import * as userController from '../controllers/userController.js';
import upload from '../middleware/upload.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(verifyToken, userController.list_all_users)
router
    .route('/:userId')
    .get(verifyToken, userController.read_user)
    .post(verifyToken, userController.delete_user)
    .put(verifyToken, userController.update_user);
router
    .route('/:userId/avatar')
    .post(verifyToken, upload.single('avatar'), userController.uploadAvatar);


export default router;

