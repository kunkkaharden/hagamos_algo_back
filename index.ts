import express , {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { dbConection } from './db/config';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
dbConection();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        message: 'not found'
    });
});

app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});