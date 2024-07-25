import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import startKafkaConsumer from './kafka/consumer/consumer.js';
import router from './routes/routes.js'


dotenv.config();


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(router);


// Connecting to MongoDB
const MONGO_URI = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const db = mongoose.connection

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});


// Handling graceful shutdown
process.on('SIGINT', async () => {
    try {
        await db.close();
        console.log('Mongoose connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing Mongoose connection:', err);
        process.exit(1);
    }
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    startKafkaConsumer();
});
