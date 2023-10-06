const bcrypt = require('bcrypt');
const CONFIG = require('../Constants/config')
const User = require("../models/user")
const jwt = require('jsonwebtoken')

module.exports.getUserByEmail = (email) => {
    return User.findOne({ email })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return { status: true, result: { hashPassword } };
    }
    catch (e) {
        console.log(e);
        return { status: false, error: e }
    }
}

module.exports.generateJWTToken = async (id) => {

    return jwt.sign({ _id: id }, CONFIG.JWT_SECRET, { expiresIn: '24h' });
};

module.exports.createUser = (data) => {
    const newUser = new User(data)
    return newUser.save()
        .then(result => {
            console.log('hi');
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.findUserById = (id) => {
    return User.findById(id)
        .then((result) => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.updateUser = (user_Id, user_data) => {
    return User.findOneAndUpdate({ _id: user_Id }, user_data, { new: true })
        .then((result) => {
            console.log("User Updated")
            return { status: true, result }
        })
        .catch((err) => {
            console.log(err)
            return { status: false, result: err }
        });
} 