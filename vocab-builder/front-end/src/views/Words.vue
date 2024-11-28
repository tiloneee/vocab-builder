<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Words</h1>
      <table id="words" class="table-auto w-full border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">English</th>
            <th class="border border-gray-300 px-4 py-2 text-left">German</th>
            <th colspan="3" class="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(word, i) in words"
            :key="i"
            class="hover:bg-gray-50 even:bg-gray-100"
          >
            <td class="border border-gray-300 px-4 py-2">{{ word.english }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ word.german }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <router-link
                :to="{ name: 'show', params: { wordId: word._id }}"
                class="text-blue-600 hover:underline"
              >
                Show
              </router-link>
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <router-link
                :to="{ name: 'edit', params: { wordId: word._id }}"
                class="text-green-600 hover:underline"
              >
                Edit
              </router-link>
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <button
                @click.prevent="onDestroy(word._id)"
                class="text-red-600 hover:underline"
              >
                Destroy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers.js';
  
  export default {
    name: 'words',
    data() {
      return {
        words: []
      };
    },
    methods: {
      async onDestroy(id) {
        const sure = window.confirm('Are you sure you want to delete this word?');
        if (!sure) return;
        await api.deleteWord(id);
        this.flash('Word deleted', 'success');
        const newWords = this.words.filter(word => word._id !== id);
        this.words = newWords;
      }
    },
    async mounted() {
      this.words = await api.getWords();
    }
  };
  </script>
  