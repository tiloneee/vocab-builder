<template>
    <div>
        <h1>Words</h1>
        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in words":key="i">
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>
                <td width="75" class="center aligned">
                <router-link :to="{ name: 'show', params: { wordId: word._id }}">Show</router-link></td>
                <td width="75" class="center aligned">
                <router-link :to="{ name: 'edit', params: { wordId: word._id }}">Edit</router-link></td>
                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                    <a :href="`/words/${word._id}`">Destroy</a>
                </td>
            </tr>
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
    },methods: {
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
}
</script>