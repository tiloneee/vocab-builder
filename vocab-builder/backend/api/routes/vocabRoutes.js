import express from 'express';
import * as vocabBuilder from '../controllers/vocabController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/words')
    .get(vocabBuilder.list_all_words)
    .post(verifyToken,vocabBuilder.create_a_word);

router
    .route('/words/:wordId')
    .get(vocabBuilder.read_a_word)
    .put(verifyToken,vocabBuilder.update_a_word)
    .delete(verifyToken,vocabBuilder.delete_a_word);

export default router;
