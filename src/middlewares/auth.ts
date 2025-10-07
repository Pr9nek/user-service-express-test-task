import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/authentication_error';

interface JwtPayload {
    userId: string;
    role: 'admin' | 'user';
}

interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        throw new AuthenticationError('Требуется авторизация');
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = payload;
        next();
    } catch {
        throw new AuthenticationError('Недействительный токен');
    }
};