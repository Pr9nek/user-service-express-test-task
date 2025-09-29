import { constants } from 'http2';

export class ConflictError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = constants.HTTP_STATUS_CONFLICT;
        this.name = 'ConflictError';
    }
}