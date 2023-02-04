import express , {  Request, Response, } from 'express';
import https from 'https';
import cors from 'cors';
import dotenv from 'dotenv';
import registroRoutes from './routes/registro';
import postRoutes from './routes/post';
import { dbConection } from './db/config';
import { generateJwt } from './util/jwt';
import httpsOptios from './util/getHttpsOptios';

dotenv.config();

const PORT = process.env.APP_PORT;


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


const server = https.createServer(httpsOptios, app);
server.listen(PORT, () => {
    console.log(generateJwt({saludo: 'hola'}));
    console.log(
        `Server running on ${PORT}.`
    )
});