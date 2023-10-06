const Joi = require('joi')

module.exports.validateNews = (req,res,next) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string(),
        link: Joi.string(),
        date: Joi.date()
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

module.exports.validateUpdateNews = (req,res,next) => {
    const schema = Joi.object().keys({
        _id: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string(),
        link: Joi.string(),
        date: Joi.date()
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