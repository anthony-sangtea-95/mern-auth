import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import { handleError, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(notFound);
app.use(handleError);

app.listen(PORT,'localhost',() => {
    console.log(`Server run on port ${PORT}`);
})