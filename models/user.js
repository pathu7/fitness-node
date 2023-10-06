const mongoose = require("mongoose");
const user = mongoose.Schema (
    {
        email:{
            type:String,
            unique:true
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
        profileImage:{
            type:String
        }
    }, {timestamps:true}
)

module.exports = mongoose.model('user',user)