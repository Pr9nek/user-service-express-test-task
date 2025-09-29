import express from 'express';
import { errors } from 'celebrate';
import router from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error';

const app = express();
app.use(requestLogger);

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
    res.json({ message: 'User Service API' });
});

app.use(router);

app.use(errorLogger);
app.use(errors()); 
app.use(errorHandler); 

export default app;