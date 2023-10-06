const mongoose = require('mongoose')
const booking = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
            // unique:true
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classes'
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Booking', booking)