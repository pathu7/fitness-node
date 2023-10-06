const nutritionTracker = require('../models/nutritionTracker')

module.exports.getMealByName = (foodName) => {
    return nutritionTracker.findOne({ foodName })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.createMeal = (data) => {
    const newNutritionTracker = new nutritionTracker(data)
    return newNutritionTracker.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getMeals = () => {
    return nutritionTracker.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.findMealById = (id) => {
    return nutritionTracker.findOne({_id:id})
        .then((result) => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.updateMeal = (meal_Id, meal_data) => {
    return nutritionTracker.findOneAndUpdate({ _id: meal_Id }, meal_data, { new: true })
        .then((result) => {
            console.log("User Updated")
            return { status: true, result }
        })
        .catch((err) => {
            console.log(err)
            return { status: false, result: err }
        });
} 