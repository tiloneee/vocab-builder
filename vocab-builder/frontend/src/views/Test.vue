<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold mb-6 text-center">Test</h1>
  
      <div v-if="words.length < 5">
        <p class="text-center text-xl font-medium text-red-700">You need to enter at least five words to begin the test</p>
      </div>
      <div v-else>
        <vocab-test :words="words"></vocab-test>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  import VocabTest from '../components/VocabTest.vue';
  
  export default {
    name: 'test',
    components: {
      'vocab-test': VocabTest
    },
    data() {
      return {
        words: []
      };
    },
    async mounted() {
      this.words = await api.getWords();
    }
  };
  </script>