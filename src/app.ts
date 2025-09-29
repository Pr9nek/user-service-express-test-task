import express from 'express';
import User from './models/user';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
    res.json({ message: 'User Service API' });
});

// Тестовый маршрут для создания пользователя
app.post('/test-user', async (req, res) => {
    try {
        const { fullName, birthDate, email, password, role, isActive } = req.body;
        const user = await User.create({
            fullName,
            birthDate,
            email,
            password,
            role,
            isActive,
        });
        res.status(201).json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        } else {
            res.status(500).json({ message: 'Error creating user', error: String(err) });
        }
    }
});

export default app;