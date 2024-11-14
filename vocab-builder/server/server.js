import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Vocab from './api/models/vocabModel.js'; // Ensure the file extension is included if using ES Modules
import vocabRoutes from './api/routes/vocabRoutes.js';
import authRoutes from './api/routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://thloc1106:Stewie2klight!@vocab-builder.mgpg8.mongodb.net/?retryWrites=true&w=majority&appName=vocab-builder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', vocabRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});
