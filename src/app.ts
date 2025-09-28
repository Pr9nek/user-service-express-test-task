import express from 'express';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
res.json({ message: 'User Service API' });
});

export default app;