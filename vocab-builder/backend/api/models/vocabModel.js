import mongoose from "mongoose";

const { Schema } = mongoose;

const VocabSchema = new mongoose.Schema(
    {
        english: {
            type: String,
            required: 'Enter the English word',
        },
        german: {
            type: String,
            required: 'Enter the German translation',
        },
        vietnamese: {
            type: String,
            required: 'Enter the Vietnamese translation',
        }
    },
    {
        collection: 'vocab',
    }
);

export default mongoose.model('Vocab', VocabSchema);