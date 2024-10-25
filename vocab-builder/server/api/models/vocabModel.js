const mongoose = require('mongoose');

const { Schema } = mongoose;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'Enter the English word',
        },
        german: {
            type: String,
            required: 'Enter the German translation',
        },
    },
    {
        collection: 'vocab',
    }
);

module.exports = mongoose.model('Vocab', VocabSchema);