<template>
    <div class="container mx-auto px-4">
      <!-- Translation Form -->
      <div class="bg-white shadow rounded-lg p-6 mt-6">
        <form @submit.prevent="handleTranslate">
          <div class="grid grid-cols-2 gap-4">
            <!-- Original Text -->
            <div>
              <textarea
                v-model="formData.originalText"
                rows="4"
                placeholder="Enter text to translate"
                class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <!-- Translated Text -->
            <div>
              <textarea
                rows="4"
                readonly
                placeholder="Translated text"
                class="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
              >{{ translatedText }}</textarea>
            </div>
          </div>
  
          <div class="grid grid-cols-2 gap-4 mt-4">
            <!-- Source Language -->
            <div>
              <select
                v-model="formData.sourceLang"
                class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
                  v-for="lang in languages"
                  :key="lang.code"
                  :value="lang.code"
                >
                  {{ lang.name }}
                </option>
              </select>
            </div>
            <!-- Target Language -->
            <div>
              <select
                v-model="formData.targetLang"
                class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
                  v-for="lang in languages"
                  :key="lang.code"
                  :value="lang.code"
                >
                  {{ lang.name }}
                </option>
              </select>
            </div>
          </div>
  
          <!-- Translate Button -->
          <button
            @click="handleTranslate"
            :class="[
              'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4',
              { 'opacity-50 cursor-not-allowed': isLoading || !formData.originalText.trim() }
            ]"
            :disabled="isLoading || !formData.originalText.trim()"
          >
            <span v-if="!isLoading">Translate</span>
            <span v-else>Loading...</span>
          </button>
        </form>
      </div>
  
      <!-- Translation History -->
      <TranslationHistory
        :translations="translations"
        @delete="handleDelete"
        class="mt-6"
      />
  
      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mt-4"
      >
        <button
          @click="error = null"
          class="float-right text-red-500 hover:text-red-700 font-bold"
        >
          ×
        </button>
        <strong>Error:</strong> {{ error }}
      </div>
    </div>
  </template>
  
  <style>
  textarea {
    resize: none;
  }
  </style>
  
  <script lang="js">
  import { ref, onMounted } from 'vue';
  import { translateAPI } from '@/helpers/helpers';
  import TranslationHistory from '@/components/TranslationHistory.vue';
  import { LANGUAGES } from '@/constants/languages';
  
  export default {
    name: 'Translation',
  
    components: {
      TranslationHistory,
    },
  
    setup() {
      const formData = ref({
        originalText: '',
        sourceLang: 'en',
        targetLang: 'vi',
      });
  
      const translations = ref([]);
      const translatedText = ref('');
      const isLoading = ref(false);
      const error = ref(null);
  
      const languages = LANGUAGES;
  
      const loadHistory = async () => {
        try {
          const response = await translateAPI.getHistory();
          translations.value = response.data;
        } catch (err) {
          error.value = 'Failed to load translation history.';
        }
      };
  
      const handleTranslate = async () => {
        if (!formData.value.originalText.trim()) return;
  
        isLoading.value = true;
        error.value = null;
  
        try {
          const response = await translateAPI.translate(
            formData.value.originalText,
            formData.value.sourceLang,
            formData.value.targetLang
          );
          translatedText.value = response.data.translatedText;
          await loadHistory();
        } catch (err) {
          error.value = 'Translation failed. Please try again.';
        } finally {
          isLoading.value = false;
        }
      };
  
      const handleDelete = async (id) => {
        try {
          const sure = window.confirm(
            'Are you sure you want to delete this translation?'
          );
          if (!sure) return;
          await translateAPI.deleteTranslation(id);
          await loadHistory();
        } catch (err) {
          error.value = 'Failed to delete translation.';
        }
      };
  
      onMounted(() => {
        loadHistory();
      });
  
      return {
        formData,
        translations,
        translatedText,
        isLoading,
        error,
        languages,
        handleTranslate,
        handleDelete,
      };
    },
  };
  </script>
  