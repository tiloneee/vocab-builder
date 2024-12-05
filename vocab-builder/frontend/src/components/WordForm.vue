<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Error Message -->
    <p v-if="Object.values(errors).some(e => e)" class="text-red-500 text-sm">Please fill out at least one field!</p>

    <!-- Dynamic Inputs -->
    <div v-for="(value, key) in word" :key="key" class="flex items-center space-x-2">
      <div class="w-36 h-12 border border-2 rounded-lg flex items-center justify-center">
        <p class="text-lg capitalize">{{ key }}</p>
      </div>
      <input type="text" :placeholder="`Enter ${key} word...`" v-model="word[key]" @input="onInput(key, word[key])"
        class="border border-gray-300 rounded-md p-2 w-full" />
    </div>

    <!-- Submit Button -->
    <button type="submit"
      class="w-1/2 flex justify-center place-self-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
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
      default: () => ({
        english: '',
        german: '',
        vietnamese: ''
      })
    }
  },
  data() {
    return {
      errors: {
        english: false,
        german: false,
        vietnamese: false
      }
    };
  },
  methods: {
    onInput(sourceLang, text) {
      if (text) {
        this.$emit('translateWord', { sourceLang, text });
      }
    },
    onSubmit() {
      const hasAtLeastOneField = Object.values(this.word).some(value => value.trim() !== '');
      if (!hasAtLeastOneField) {
        Object.keys(this.errors).forEach(key => {
          this.errors[key] = true; 
        });
      } else {
        Object.keys(this.errors).forEach(key => {
          this.errors[key] = false;
        });
        this.$emit('createOrUpdate', this.word);
      }
    }

  }
};
</script>

<style scoped>
input {
  transition: border-color 0.2s;
}

input:focus {
  border-color: #3182ce;
  outline: none;
}
</style>
