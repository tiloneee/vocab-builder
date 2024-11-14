import express from 'express';
import * as vocabBuilder from '../controllers/vocabController.js';

const router = express.Router();

router
    .route('/words')
    .get(vocabBuilder.list_all_words)
    .post(vocabBuilder.create_a_word);

router
    .route('/words/:wordId')
    .get(vocabBuilder.read_a_word)
    .put(vocabBuilder.update_a_word)
    .delete(vocabBuilder.delete_a_word);

export default router;
