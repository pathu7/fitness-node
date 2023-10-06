const mongoose = require('mongoose')
const gymLocator = mongoose.Schema(
    {
        name: {
            type: String,
            // unique: true
        },
        location: {
            type: String
        },
        amenities: {
            type:Array
        },
        rating: {
            type:Number
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Gym-Locator',gymLocator)