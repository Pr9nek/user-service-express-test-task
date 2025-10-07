import { celebrate, Joi } from 'celebrate';

export const validateUserBody = celebrate({
    body: Joi.object().keys({
        fullName: Joi.string().required().min(2).max(100),
        birthDate: Joi.date().required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(6),
        // Setting the default role to 'user' ensures that new accounts cannot gain admin privileges unless explicitly assigned,
        // which helps prevent privilege escalation by restricting elevated access to authorized users only.
        role: Joi.string().valid('admin', 'user').default('user'),
        // By default, new users are marked as active; this can be used to control account status during creation.
        isActive: Joi.boolean().default(true),
        // Disallow unknown fields to enforce strict validation and prevent unexpected input
    }).unknown(false),
});

export const validateAuthLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(6),
    }),
});

export const validateUserId = celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().hex().length(24),
    }),
});