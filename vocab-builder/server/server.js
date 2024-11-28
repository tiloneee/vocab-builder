import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Vocab from './api/models/vocabModel.js'; // Ensure the file extension is included if using ES Modules
import vocabRoutes from './api/routes/vocabRoutes.js';
import authRoutes from './api/routes/authRoutes.js';
import connection from './api/mongo/connect.js'
import translateRoute from './api/routes/translateRoutes.js';
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', vocabRoutes);
app.use('/', authRoutes);
app.use('/', translateRoute);

connection()
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch( (error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});
