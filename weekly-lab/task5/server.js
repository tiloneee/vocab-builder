import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
    res.send('This is home Page.');
});

app.get('/student', async (req, res) => {
    res.send('This is student Page.');
});

app.get('/admin', async (req, res) => {
    res.send('This is admin Page.');
});

app.get('/data', async (req, res) => {
    res.send({message: "Hello world JSON"});
});

app.use((req, res) => {
    res.status(404).send('Invalid request!');
});

const startServer = async () => {
    try {
        app.listen(8080, () => console.log('Server is running on port 8080'));
    } catch (error) {
        console.log(error);
    }
}

startServer();