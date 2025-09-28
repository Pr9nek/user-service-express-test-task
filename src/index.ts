import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/users_db';

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});