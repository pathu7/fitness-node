const mongoose = require("mongoose");
const contactSupport = mongoose.Schema(
    {
        subject: {
            type: String,
            // unique:true
        },
        message: {
            type: String
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Contact-Support', contactSupport)