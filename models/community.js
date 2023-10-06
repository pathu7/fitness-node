const mongoose = require('mongoose')
const community = mongoose.Schema (
    {
        content:{
            type:String,
            // unique:true
        },
        communityImage:{
            type:String
        }
    }, {timestamps:true}
)

module.exports = mongoose.model('Community',community)