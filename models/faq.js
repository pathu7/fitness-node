const mongoose = require("mongoose");
const FAQs = mongoose.Schema(
    {
        question: {
            type: String,
            // unique:true
        },
        answer: {
            type: String
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('faqs', FAQs)