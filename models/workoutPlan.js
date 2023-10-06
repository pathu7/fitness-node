const mongoose = require("mongoose");
const workoutPlan = mongoose.Schema (
    {
        name:{
            type:String,
            unique:true
        },
        duration:{
            type:String
        }
    }, {timestamps:true}
)

module.exports = mongoose.model('Workout-Plan',workoutPlan)