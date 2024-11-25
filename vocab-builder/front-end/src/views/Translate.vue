<template>
    <div class="ui container">
        <!-- Translation Form -->
        <div class="ui segment">
            <div class="ui form">
                <div class="two fields">
                    <div class="field">
                        <textarea v-model="formData.originalText" rows="4" placeholder="Enter text to translate"></textarea>
                    </div>
                    <div class="field">
                        <textarea rows="4" placeholder="Translated text">{{ translatedText }}</textarea>
                    </div>
                    
                </div>

                <div class="two fields">
                    <div class="field">
                        <select v-model="formData.sourceLang" class="ui dropdown">
                            <!-- <option value="auto">Auto Detect</option> -->
                            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                                {{ lang.name }}
                            </option>
                        </select>
                    </div>

                    <div class="field">
                        <select v-model="formData.targetLang" class="ui dropdown">
                            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                                {{ lang.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <button @click="handleTranslate" :class="['ui primary button', { loading: isLoading }]"
                    :disabled="isLoading || !formData.originalText.trim()">
                    Translate
                </button>
            </div>
        </div>

        <!-- Translation History -->
        <TranslationHistory :translations="translations" @delete="handleDelete" />

        <!-- Error Message -->
        <div v-if="error" class="ui negative message">
            <i class="close icon" @click="error = null"></i>
            <div class="header">Error</div>
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<style>


.ui.segment {
    display: flex;
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;
}
</style>

<script lang="js">
import { ref, onMounted } from 'vue';
import { translateAPI } from '@/helpers/helpers';
import TranslationHistory from '@/components/TranslationHistory.vue';
import { LANGUAGES } from '@/constants/languages';

export default {
    name: 'Translation',

    components: {
        TranslationHistory
    },

    setup() {
        const formData = ref({
            originalText: '',
            sourceLang: 'en',
            targetLang: 'vi'
        });

        const translations = ref([]);
        const translatedText = ref('');
        const isLoading = ref(false);
        const error = ref(null);

        const languages = LANGUAGES;

        const loadHistory = async () => {
            try {
                const response = await translateAPI.getHistory();
                
                translations.value = response.data;
                console.log(response.data);
                 /// this is the data from the response
            } catch (err) {
                error.value = 'Failed to load translation history.';
            }
        };
        const handleTranslate = async () => {
            if (!formData.value.originalText.trim()) return;

            isLoading.value = true;
            error.value = null;

            try {
                const response = await translateAPI.translate(
                    formData.value.originalText,
                    formData.value.sourceLang,
                    formData.value.targetLang
                );
                console.log(response);
                translatedText.value = response.data.translatedText;
                
                await loadHistory();
            } catch (err) {
                error.value = 'Translation failed. Please try again.';
            } finally {
                isLoading.value = false;
            }
        };

        const handleDelete = async (id) => {
            try {
                const sure = window.confirm('Are you sure you want to delete this translation?');
                if (!sure) return;
                await translateAPI.deleteTranslation(id);
                await loadHistory();
            } catch (err) {
                error.value = 'Failed to delete translation.';
            }
        };
        onMounted(() => {
            loadHistory();
            $('.ui.dropdown').dropdown();
        });

        return {
            formData,
            translations,
            translatedText,
            isLoading,
            error,
            languages,
            handleTranslate,
            handleDelete
        };
    }
}
</script>