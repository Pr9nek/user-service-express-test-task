import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    role: 'admin' | 'user';
}

export const createToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};