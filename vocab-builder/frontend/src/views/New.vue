<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-semibold mb-6 text-center">New Word</h1>
    <!-- WordForm Component -->
    <word-form 
      :word="word"
      @createOrUpdate="createOrUpdate"
    />
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api, translateAPI } from '../helpers/helpers';

export default {
  name: 'new-word',
  components: {
    'word-form': WordForm
  },
  data() {
    return {
      word: {
        english: '',
        german: '',
        vietnamese: ''
      }
    };
  },
  methods: {
    async translateWord(sourceLang, text) {
      try {
        // Define the target languages dynamically
        const targets = ['en', 'de', 'vi'].filter(lang => lang !== sourceLang);

        // Translate for each target language
        for (const targetLang of targets) {
          const response = await translateAPI.translate(text, sourceLang, targetLang);
          // Update the corresponding field in the word object
          if (targetLang === 'en') this.word.english = response.data.translatedText;
          if (targetLang === 'de') this.word.german = response.data.translatedText;
          if (targetLang === 'vi') this.word.vietnamese = response.data.translatedText;
        }
      } catch (error) {
        console.error('Translation Error:', error);
        this.$toast.error('Error occurred during translation', 'error');
      }
    },
    async createOrUpdate(word) {
      try {
        // Determine which field is filled and translate the rest
        if (word.english) await this.translateWord('en', word.english);
        else if (word.german) await this.translateWord('de', word.german);
        else if (word.vietnamese) await this.translateWord('vi', word.vietnamese);

        // Submit the word after translation
        const response = await api.createWord(this.word);
        this.$toast.success('Word created successfully!', 'success');
        this.$router.push(`/words/${response._id}`);
      } catch (error) {
        console.error('Creation Error:', error);
        this.$toast.error('Failed to create the word', 'error');
      }
    }
  }
};
</script>

<style scoped>
/* Optional: You can customize any additional styling here if needed */
</style>
