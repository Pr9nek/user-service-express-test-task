import { celebrate, Joi } from 'celebrate';

export const validateUserBody = celebrate({
    body: Joi.object().keys({
        fullName: Joi.string().required().min(2).max(100).default('John Doe'),
        birthDate: Joi.date().required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(6),
        role: Joi.string().valid('admin', 'user').default('user'),
        isActive: Joi.boolean().default(true),
    }).unknown(true),
});

export const validateAuthLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(6),
    }).unknown(true),
});

export const validateUserId = celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().hex().length(24),
    }),
});