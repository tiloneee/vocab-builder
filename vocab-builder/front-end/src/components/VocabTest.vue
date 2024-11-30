<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">Score: {{ score }} out of {{ words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit" class="space-y-4">
      <!-- German Input -->
      <div class="flex items-center">
        <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md">
          <i class="fi fi-de text-lg"></i> German
        </div>
        <input 
          type="text" 
          readonly 
          :disabled="testOver" 
          :value="currWord.german" 
          class="w-full border border-gray-300 rounded-r-md px-4 py-2 focus:ring focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>

      <!-- English Input -->
      <div class="flex items-center">
        <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md">
          <i class="fi fi-gb text-lg"></i> English
        </div>
        <input 
          type="text" 
          placeholder="Enter word..." 
          v-model="english" 
          :disabled="testOver" 
          autocomplete="off" 
          class="w-full border border-gray-300 rounded-r-md px-4 py-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Submit Button -->
      <button 
        :disabled="testOver" 
        class="w-1/2 place-self-center bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
      >
        Submit
      </button>
    </form>


  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord: function () {
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    onSubmit: function () {
      if (this.english === this.currWord.english) {
        this.$toast.success('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.$toast.error('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord.german);
      }

      this.english = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function () {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    }
  }
};
</script>

<style scoped>
.results {
  margin-top: 1.5rem;
}
</style>
