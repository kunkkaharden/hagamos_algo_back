import express , {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registroRoutes from './routes/registro';
import postRoutes from './routes/post';
import { dbConection } from './db/config';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
dbConection();

app.use(cors());
app.use(express.json());


app.use('/api/registro', registroRoutes);
app.use('/api/publicacion', postRoutes);

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