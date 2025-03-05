import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to TimeBank API' });
});

// Swagger Documentation setup
const swaggerFile = require('./swagger_output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

export default app;
