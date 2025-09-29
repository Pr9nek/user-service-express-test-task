import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';
import User from '../models/user';
import { AuthenticationError } from '../errors/authentication_error';
import { BadRequestError } from '../errors/bad_request_error';
import { ConflictError } from '../errors/conflict_error';
import { createToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
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

        // Явно возвращаем только безопасные поля
        const { _id, fullName: createdFullName, email: createdEmail, role: createdRole, isActive: createdIsActive } = user;

        return res.status(constants.HTTP_STATUS_CREATED).json({
            _id,
            fullName: createdFullName,
            email: createdEmail,
            role: createdRole,
            isActive: createdIsActive,
        });
    } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
            return next(new BadRequestError('Некорректные данные пользователя'));
        }
        if (error instanceof Error && error.message.startsWith('E11000')) {
            return next(new ConflictError('Конфликт создания сущности в БД'));
        }
        return next(error);
    }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Явно запрашиваем скрытое поле password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new AuthenticationError('Неправильные почта или пароль');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new AuthenticationError('Неправильные почта или пароль');
        }
        if (!user.isActive) {
            throw new AuthenticationError('Учетная запись пользователя деактивирована');
        }

        const token = createToken({ userId: String(user._id), role: user.role });
        return res.status(constants.HTTP_STATUS_OK).json({ token });
    } catch (error) {
        return next(error);
    }
};