import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const errorRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH', 
    maxSize: '10m',
    maxFiles: '7d',
    zippedArchive: true,
});

const requestRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'request-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m', 
    maxFiles: '14d',
    zippedArchive: true,
});

export const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        requestRotateTransport, 
    ],
    format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
    transports: [
        errorRotateTransport, 
    ],
    format: winston.format.json(),
});