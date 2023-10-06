const mongoose = require("mongoose");
const nutritionTracker = mongoose.Schema(
    {
        foodName: {
            type: String,
            unique: true
        },
        calories: {
            type: Number
        },
        protein: {
            type: Number
        },
        fat: {
            type: Number
        },
        carbs: {
            type: Number
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Nutrition-Tracker', nutritionTracker)