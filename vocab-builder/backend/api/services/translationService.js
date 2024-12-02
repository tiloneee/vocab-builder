import axios from 'axios';
import { Translation } from '../models/translateModel.js';

export class TranslationService {
  static async translateText(text, sourceLang, targetLang) {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
        de: process.env.TRANSLATION_EMAIL
      }
    });
    return response.data.responseData.translatedText;
  }

  static async createTranslation(translationData) {
    return await Translation.create(translationData);
  }

  static async getTranslationHistory(userId) {
    return await Translation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
  }

  static async deleteTranslation(id, userId) {
    return await Translation.findOneAndDelete({ _id: id, userId });
  }
}