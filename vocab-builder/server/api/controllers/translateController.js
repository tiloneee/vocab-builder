import { TranslationService } from '../services/translationService.js';

export class TranslationController {
  static async translate(req, res) {
    try {
      const { text, sourceLang, targetLang } = req.body;
      const userId = req.user._id;

      const translatedText = await TranslationService.translateText(
        text,
        sourceLang,
        targetLang
      );

      const translation = await TranslationService.createTranslation({
        originalText: text,
        translatedText,
        sourceLang,
        targetLang,
        userId
      });

      res.status(200).json({
        success: true,
        data: translation
      });
    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({
        success: false,
        error: 'Translation failed'
      });
    }
  }

  static async getHistory(req, res) {
    try {
      const userId = req.user._id;
      const translations = await TranslationService.getTranslationHistory(userId);

      res.status(200).json({
        success: true,
        data: translations
      });
    } catch (error) {
      console.error('Error fetching history:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch translation history'
      });
    }
  }

  static async deleteTranslation(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const translation = await TranslationService.deleteTranslation(id, userId);

      if (!translation) {
        return res.status(404).json({
          success: false,
          error: 'Translation not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Translation deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting translation:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete translation'
      });
    }
  }
}