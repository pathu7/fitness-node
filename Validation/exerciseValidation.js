const Joi = require('joi')

module.exports.validateCreateExercise = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        musclesTargeted: Joi.array().required(),
        difficulty: Joi.string().required(),
        equipmentNeeded: Joi.string().required(),
        exerciseImage: Joi.string(),
        exerciseVideo: Joi.string(),
        repetitions: Joi.string().required(),
        sets: Joi.string().required(),
        restInterval: Joi.string().required()
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
module.exports.validateUpdateExercise = (req, res, next) => {
    const schema = Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        musclesTargeted: Joi.array().required(),
        difficulty: Joi.string().required(),
        equipmentNeeded: Joi.string().required(),
        exerciseImage: Joi.string(),
        exerciseVideo: Joi.string(),
        repetitions: Joi.string().required(),
        sets: Joi.string().required(),
        restInterval: Joi.string().required()
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