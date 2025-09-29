import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import User from '../models/user';
import { AuthenticationError } from '../errors/authentication_error';
import { BadRequestError } from '../errors/bad_request_error';
import { NotFoundError } from '../errors/not_found_error';

interface AuthRequest extends Request {
    user?: { userId: string; role: 'admin' | 'user' };
}

export const getUserById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;
        if (!currentUser) {
            throw new AuthenticationError('Требуется авторизация');
        }
        if (currentUser.userId !== id && currentUser.role !== 'admin') {
            throw new AuthenticationError('Доступ запрещён');
        }
        const user = await User.findById(id).orFail(new NotFoundError('Пользователь не найден'));
        return res.status(constants.HTTP_STATUS_OK).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user;
        if (!currentUser || currentUser.role !== 'admin') {
            throw new AuthenticationError('Доступ запрещён');
        }
        const users = await User.find({});
        return res.status(constants.HTTP_STATUS_OK).json(
            users.map((user) => ({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            })),
        );
    } catch (error) {
        next(error);
    }
};

export const blockUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;
        if (!currentUser) {
            throw new AuthenticationError('Требуется авторизация');
        }
        if (currentUser.userId !== id && currentUser.role !== 'admin') {
            throw new AuthenticationError('Доступ запрещён');
        }
        const user = await User.findById(id).orFail(new NotFoundError('Пользователь не найден'));
        if (!user.isActive) {
            throw new BadRequestError('Пользователь уже заблокирован');
        }
        user.isActive = false;
        await user.save();
        return res.status(constants.HTTP_STATUS_OK).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        });
    } catch (error) {
        next(error);
    }
};