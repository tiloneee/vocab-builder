import express from 'express';
import { TranslationController } from '../controllers/translateController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/translate', verifyToken, TranslationController.translate);
router.get('/translate/history', verifyToken, TranslationController.getHistory);
router.delete('/translation/:id', verifyToken, TranslationController.deleteTranslation);

export default router;