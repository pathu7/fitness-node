const Joi = require('joi')

module.exports.validateCreateCommunity = (req, res, next) => {
    const schema = Joi.object().keys({
        content: Joi.string().required(),
        communityImage: Joi.string()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}