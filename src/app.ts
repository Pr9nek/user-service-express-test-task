import express from 'express';
import { errors } from 'celebrate';
import router from './routes';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
    res.json({ message: 'User Service API' });
});

app.use(router);

app.use(errors()); // Обработчик ошибок celebrate
app.use(errorHandler); // Кастомный обработчик ошибок

export default app;