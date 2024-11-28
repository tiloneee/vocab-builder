<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold mb-6 text-center">New Word</h1>
      <!-- WordForm Component -->
      <word-form @createOrUpdate="createOrUpdate" />
    </div>
  </template>
  
  <script>
  import WordForm from '../components/WordForm.vue'; 
  import { api } from '../helpers/helpers';
  
  export default {
    name: 'new-word',
    components: {
      'word-form': WordForm
    },
    methods: {
      createOrUpdate: async function (word) {
        const res = await api.createWord(word); 
        this.flash('Word created', 'success'); 
        this.$router.push(`/words/${res._id}`);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional: You can customize any additional styling here if needed */
  </style>
  