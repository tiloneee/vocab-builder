<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold mb-6 text-center">Edit Word</h1>
      <!-- WordForm Component -->
      <word-form @createOrUpdate="createOrUpdate" :word=this.word></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers.js';

export default {
    name: 'edit',
    components: {
        'word-form': WordForm
    },
    data: function () {
        return {
            word: {}
        };
    },
    async mounted() {
        this.word = await api.getWord(this.$route.params.wordId);
    },
    methods: {
        createOrUpdate: async function (word) {
            await api.updateWord(word);
            this.$toast.success('Word updated successfully', 'success');
            this.$router.push(`/words/${word._id}`);
    }}
    
};
</script>