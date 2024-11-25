<template>
    <div class="ui segment">
        <h3 class="ui header">Translation History</h3>
        
        <div v-if="translations.length === 0" class="ui placeholder segment">
            <div class="ui icon header">
                <i class="history icon"></i>
                No translations yet
            </div>
        </div>
        
        <div v-else class="ui relaxed divided list">
            <div v-for="translation in translations" :key="translation._id" class="item">
                <div class="right floated content">
                    <button @click="$emit('delete', translation._id)" class="ui mini negative icon button">
                        <i class="trash icon"></i>
                    </button>
                </div>
                
                <div class="content">
                    <div class="header">From: {{ translation.originalText }}</div>
                    <div class="description">To: {{ translation.translatedText }}</div>
                    <div class="meta">
                        <span>{{ getLanguageName(translation.sourceLang) }} → {{ getLanguageName(translation.targetLang) }}</span>
                    </div>
                    <div class="meta">
                        <span class="date"> {{ formatDate(translation.createdAt) }}</span>
                    </div>
                </div>
            </div>
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

<script>
import { LANGUAGES } from '@/constants/languages';

export default {
    name: 'TranslationHistory',
    
    props: {
        translations: {
            type: Array,
            required: true
        }
    },
    
    setup() {
        const languageMap = LANGUAGES.reduce((acc, lang) => {
            acc[lang.code] = lang.name;
            return acc;
        }, {});

        const formatDate = (date) => {
            return new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        const getLanguageName = (langCode) => {
            return languageMap[langCode] || langCode;
        };

        return {
            formatDate,
            getLanguageName
        };
    }
}
</script>