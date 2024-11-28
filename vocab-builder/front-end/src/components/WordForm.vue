<template>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Error Message -->
      <p v-if="errorsPresent" class="text-red-500 text-sm">Please fill out both fields!</p>
  
      <!-- German Input -->
      <div class="flex items-center space-x-2">
        <div class="flex-shrink-0">
          <i class="germany flag"></i>
        </div>
        <input 
          type="text" 
          placeholder="Enter Germany word..." 
          v-model="word.german" 
          class="border border-gray-300 rounded-md p-2 w-full" 
        />
      </div>
  
      <!-- English Input -->
      <div class="flex items-center space-x-2">
        <div class="flex-shrink-0">
          <i class="united kingdom flag"></i>
        </div>
        <input 
          type="text" 
          placeholder="Enter English word..." 
          v-model="word.english" 
          class="border border-gray-300 rounded-md p-2 w-full" 
        />
      </div>
  
      <!-- Submit Button -->
      <button 
        type="submit" 
        class="w-1/2 flex justify-center place-self-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'word-form',
    props: {
      word: {
        type: Object,
        required: false,
        default: () => {
          return {
            english: '',
            german: ''
          };
        }
      }
    },
    data() {
      return {
        errorsPresent: false
      };
    },
    methods: {
      onSubmit() {
        if (this.word.english === '' || this.word.german === '') {
          this.errorsPresent = true;
        } else {
          this.$emit('createOrUpdate', this.word);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* If needed, you can add custom styles, but Tailwind CSS classes should be sufficient */
  </style>
  