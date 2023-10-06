const Joi = require('joi')

module.exports.validateFaqs = (req,res,next) => {
    const schema = Joi.object().keys({
        question: Joi.string().required(),
        answer: Joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error);
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    } 
}

module.exports.validateContactSupport = (req,res,next) => {
    const schema = Joi.object().keys({
        subject: Joi.string().required(),
        message: Joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error);
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    } 
}