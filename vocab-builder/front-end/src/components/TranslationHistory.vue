<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h3 class="text-lg font-bold text-gray-700 mb-4">Translation History</h3>
  
      <!-- Placeholder for Empty History -->
      <div v-if="translations.length === 0" class="flex flex-col items-center text-gray-500 py-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v16h16M4 4l16 16" />
        </svg>
        <p class="text-lg">No translations yet</p>
      </div>
  
      <!-- Translation List -->
      <div v-else class="space-y-4">
        <div
          v-for="translation in translations"
          :key="translation._id"
          class="flex justify-between items-center border-b pb-3 last:border-none"
        >
          <div>
            <div class="font-semibold text-gray-700">From: {{ translation.originalText }}</div>
            <div class="text-gray-600">To: {{ translation.translatedText }}</div>
            <div class="text-sm text-gray-500">
              {{ getLanguageName(translation.sourceLang) }} → {{ getLanguageName(translation.targetLang) }}
            </div>
            <div class="text-sm text-gray-400">{{ formatDate(translation.createdAt) }}</div>
          </div>
          <button
            @click="$emit('delete', translation._id)"
            class="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { LANGUAGES } from '@/constants/languages';
  
  export default {
    name: 'TranslationHistory',
    props: {
      translations: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const languageMap = LANGUAGES.reduce((acc, lang) => {
        acc[lang.code] = lang.name;
        return acc;
      }, {});
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      };
  
      const getLanguageName = (langCode) => {
        return languageMap[langCode] || langCode;
      };
  
      return {
        formatDate,
        getLanguageName,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  