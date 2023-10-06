const nutritionTrackerService = require('../service/nutritionTrackerService')

module.exports.createMeal = async (req, res, next) => {
    try {
        console.log(req.body);
        let meal = await nutritionTrackerService.getMealByName(req.body.foodName)

        if (meal.result) {
            return res.status(200).send({
                status: false,
                message: 'Meal exists'
            })
        } else {

            let CreateMeal = await nutritionTrackerService.createMeal(req.body)
            if (CreateMeal.status) {
                return res.status(200).send({
                    message: 'Meal created',
                    status: true
                })
            } else {
                res.status(500).send({ status: false, error: err })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getAllMeal = async (req, res, next) => {
    try {
        let getMeals = await nutritionTrackerService.getMeals()

        if (!getMeals.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getMeals.result) return res.status(200).send({ status: false, error: 'Meals Not Present!!!' });

        return res.status(200).send(getMeals);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getMealById = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id,req.params);

        // console.log('parsedUrl',parsedUrl,"query",query);
        // console.log("_parsedUrl",req._parsedUrl,"query:",req.query);

        let Meal = await nutritionTrackerService.findMealById(id)
        console.log(Meal);
        if (!Meal.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!Meal.result) return res.status(200).send({ status: false, error: 'Meal Not Present!!!' });

        return res.status(200).send(Meal);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.updateMeal = async (req, res, next) => {
    try {
        // console.log(req.userData);
        // console.log(req.body);
        // console.log(req.file);

        let meal = await nutritionTrackerService.getMealByName(req.body.foodName)

        // console.log(meal, req.body);

        if (meal.result && req.body._id != meal.result._id) {
            return res.status(200).send({
                status: false,
                message: 'Meal exists'
            })
        }

        const id = req.body._id
        let data = req.body
        delete data._id

        // console.log('data ', data, id);

        let mealUpdate = await nutritionTrackerService.updateMeal(id,data)
        if (!mealUpdate.status) return res.status(500).send(mealUpdate)

        return res.status(200).send(mealUpdate);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}