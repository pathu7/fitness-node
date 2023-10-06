const Joi = require('joi')

module.exports.validateGymLocator = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        location: Joi.string().required(),
        amenities: Joi.array().required(),
        rating: Joi.number()
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