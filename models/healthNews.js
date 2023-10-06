const mongoose = require("mongoose");
const healthNews = mongoose.Schema(
    {
        title: {
            type: String,
            // unique:true
        },
        content: {
            type: String
        },
        link: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Health-News', healthNews)