import express from 'express';
import { Request, Response } from 'express';
import { errors } from 'celebrate';
import router from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error';

const app = express();
app.use(requestLogger);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'User Service API' });
});

app.use(router);

app.use(errorLogger);
app.use(errors()); 
app.use(errorHandler); 

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit to avoid undefined state
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Optional: log memory warnings
process.on('warning', (warning) => {
    console.warn('Process warning:', warning);
});

export default app;