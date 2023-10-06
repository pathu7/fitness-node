const Joi = require('joi')

module.exports.validateNutritionTracker = (req, res, next) =>{
    const schema = Joi.object().keys({
        foodName: Joi.string().required(),
        calories: Joi.number().required(),
        protein: Joi.number().required(),
        fat: Joi.number().required(),
        carbs: Joi.number().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}

module.exports.validateUpdateMeal = (req,res,next)=>{
    const schema = Joi.object().keys({
        _id: Joi.string().required(),
        foodName: Joi.string().required(),
        calories: Joi.number().required(),
        protein: Joi.number().required(),
        fat: Joi.number().required(),
        carbs: Joi.number().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.status(400).json({ error: details })
    } else {
        next()
    }
}