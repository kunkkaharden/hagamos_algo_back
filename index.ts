import express , {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});