const exercise = require('../models/exercise')

module.exports.getExerciseByName = (name) => {
    return exercise.findOne({ name })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}
module.exports.createExercise = (data) => {
    // return { status:true, result: data}
    const newExercise = new exercise(data)
    return newExercise.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}
module.exports.findExerciseById = (id) => {
    return exercise.findById(id)
        .then((result) => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}
module.exports.getAllExercise = (data) => {
    return exercise.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}
module.exports.updateExercise = (exercise_Id, exercise_data) => {
    return exercise.findOneAndUpdate({ _id: exercise_Id }, exercise_data, { new: true })
        .then((result) => {
            console.log("User Updated")
            return { status: true, result }
        })
        .catch((err) => {
            console.log(err)
            return { status: false, result: err }
        });
} 