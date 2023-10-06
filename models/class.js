const mongoose = require('mongoose')
const classes = mongoose.Schema (
    {
        className:{
            type:String,
            // unique:true
        },
        // description:{
        //     type:String
        // },
        // capacity:{
        //     type:Number
        // },
        // date:{
        //     type:Date
        // },
        time:{
            type:String
        }
    }, {timestamps:true}
)

module.exports = mongoose.model('Classes',classes)