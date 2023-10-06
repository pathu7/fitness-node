const Joi = require('joi')

module.exports.validateBookClass = (req, res, next) => {
    const schema = Joi.object().keys({
        classId: Joi.string().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}