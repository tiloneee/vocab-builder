<template>
    <div class="max-w-3xl mx-auto p-6 space-y-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Show Word</h1>
  
      <div class="bg-gray-50 p-4 rounded-lg shadow-lg">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-24 h-12 border border-2 rounded-lg flex items-center justify-center">
            <p class="text-xl">German</p>
          </div>
          <input type="text" readonly :value="word.german" class="flex-1 border-gray-300 border rounded-lg p-2" />
        </div>
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-24 h-12 border border-2 rounded-lg flex items-center justify-center">
            <p class="text-xl">English</p>
          </div>
          <input type="text" readonly :value="word.english" class="flex-1 border-gray-300 border rounded-lg p-2" />
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-36 h-12 border border-2 rounded-lg flex items-center justify-center">
            <p class="text-xl">Vietnamese</p>
          </div>
          <input type="text" readonly :value="word.vietnamese" class="flex-1 border-gray-300 border rounded-lg p-2" />
        </div>
      </div>
  
      <div class="mt-6">
        <router-link
          v-if="isLoggedIn"
          :to="{ name: 'edit', params: { wordId: this.$route.params.wordId } }"
          class="block text-center text-blue-500 underline"
        >
          Edit word
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers.js';
  
  export default {
    name: 'show',
    data() {
      return {
        word: {},
        isLoggedIn: false
      };
    },
    async mounted() {
      this.word = await api.getWord(this.$route.params.wordId);
    },
    created() {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  