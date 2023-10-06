const workoutPlan = require('../models/workoutPlan')

module.exports.getPlanByName = (name) => {
    return workoutPlan.findOne({ name })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}
module.exports.createWorkoutPlan = (data) => {
    const newWorkoutPlan = new workoutPlan(data)
    return newWorkoutPlan.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}
module.exports.getWorkoutPlan = () => {
    return workoutPlan.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.findWorkoutPlanById = (id) => {
    return workoutPlan.findById(id)
        .then((result) => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.updatePlan = (plan_Id, plan_data) => {
    return workoutPlan.findOneAndUpdate({ _id: plan_Id }, plan_data, { new: true })
        .then((result) => {
            console.log("Plan Updated")
            return { status: true, result }
        })
        .catch((err) => {
            console.log(err)
            return { status: false, result: err }
        });
} 