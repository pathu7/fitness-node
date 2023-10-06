const Joi = require('joi')

module.exports.validateCreateWorkoutPlan = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        duration: Joi.string().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}

module.exports.validateUpdateWorkoutPlan = (req, res, next) => {
    const schema = Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        duration: Joi.string().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}