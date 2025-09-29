import { constants } from 'http2';

export class AuthenticationError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
        this.name = 'AuthenticationError';
    }
}