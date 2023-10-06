const Joi = require('joi')

module.exports.validateSignInUser = (req, res, next) => {
    const schema = Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'in'] }
        }).required(),
        username:Joi.string().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const {details} = error
        return res.status(400).json({error:details})
    } else {
        next()
    }
}

module.exports.validateLoginInUser = (req, res, next) => {
    const schema = Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'in'] }
        }).required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const {details} = error
        return res.status(400).json({error:details})
    } else {
        next()
    }
}

module.exports.validateUpdateUser = (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'in'] }
        }).required(),
        profileImage: Joi.string()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const {details} = error
        return res.status(400).json({error:details})
    } else {
        next()
    }
}