import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { useExpressServer } from 'routing-controllers'
import { AuthController } from './controller/authController';
import "reflect-metadata"
import { syncUsers } from './prisma/prismaClient';

dotenv.config();

const app: Application = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
    controllers: [AuthController]
})

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to TimeBank API' });
});

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

syncUsers().then(() => console.log("users succesfully synchronized"))

export default app;
