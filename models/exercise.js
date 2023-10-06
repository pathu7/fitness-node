const mongoose = require("mongoose");
const exercise = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        musclesTargeted: {
            type: Array
        },
        difficulty: {
            type: String
        },
        equipmentNeeded: {
            type: String
        },
        exerciseImage: {
            type: String
        },
        exerciseVideo: {
            type: String
        },
        repetitions: {
            type: String
        },
        sets: {
            type: String
        },
        restInterval: {
            type: String
        },
    }, { timestamps: true }
)

module.exports = mongoose.model('exercise', exercise)