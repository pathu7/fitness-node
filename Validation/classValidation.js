const Joi = require('joi')

module.exports.validateCreateClass = (req, res, next) => {
    const schema = Joi.object().keys({
        className: Joi.string().required(),
        time: Joi.string().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}