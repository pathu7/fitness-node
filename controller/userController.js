const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const CONFIG = require('../Constants/config');
const UserService = require('../service/userService')

exports.user_signup = async (req, res, next) => {

    // if (!req.body) return res.status(400).send({ status: false, error: "no username, email and password provided" });
    try {
        let user = await UserService.getUserByEmail(req.body.email)

        if (user.result) {
            return res.status(200).send({
                status: false,
                error: 'Mail exists'
            })
        } else {
            const pass = await UserService.hashPassword(req.body.password)
            console.log('pass');
            if (pass.status) {

                let CreatedUser = await UserService.createUser({ username: req.body.username, email: req.body.email, password: pass.result.hashPassword })
                // console.log(CreatedUser);
                if (CreatedUser.status) {
                    return res.status(200).send({
                        message: 'User created',
                        status: true
                    })
                } else {
                    res.status(500).send({ status: false, error: err })
                }
            }
            else {
                console.log('hi');
                return res.status(500).send(pass);
            }

        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }

    // console.log(r);
    // return res.status(200).send({ r })

}

exports.user_login = async (req, res, next) => {

    // if (!req.body.email) return res.status(400).send({ status: false, error: "email not provided" });
    // if (!req.body.password) return res.status(400).send({ status: false, error: "password not provided" });

    try {
        let userFind = await UserService.getUserByEmail(req.body.email)
        if (!userFind.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!userFind.result) return res.status(200).send({ status: false, error: 'Email Invalid!!!' });

        let user = userFind.result;
        const isMatch = await bcrypt.compare(req.body.password, user.password);


        if (!isMatch) return res.status(200).send({ status: false, error: "Incorrect Password !" });

        // delete user.password
        user = userFind.result.toObject();
        delete user['password'];

        let token = await UserService.generateJWTToken(user._id)


        return res.status(200).send({
            status: true,
            result: { user, token: token },
        });



    }

    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        console.log(req.userData);
        const id = req.userData._id
        let userProfile = await UserService.findUserById(id)
        // console.log(userProfile.result);
        if (!userProfile.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!userProfile.result) return res.status(200).send({ status: false, error: 'User Not Present!!!' });

        user = userProfile.result.toObject();
        delete user['password'];

        return res.status(200).send({ status: true, result: user });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.updateUserProfile = async (req, res, next) => {
    try {
        // console.log(req.userData);
        // console.log(req.body);
        // console.log(req.file);

        let user = await UserService.getUserByEmail(req.body.email)

        console.log(user, req.userData._id, user.result._id);

        if (user.result && req.userData._id != user.result._id) {
            return res.status(200).send({
                status: false,
                error: 'Mail exists'
            })
        }

        const id = req.userData._id
        let data = req.body
        if (req.file) {
            const file = req.file.path
            data = { ...data, profileImage: file }
        }

        // console.log('data ', data);

        let userUpdate = await UserService.updateUser(id, data)
        if (!userUpdate.status) return res.status(500).send(userUpdate)

        // console.log('userUpdate1', userUpdate);

        userUpdate.result = userUpdate.result.toObject();
        delete userUpdate.result['password'];

        // console.log('userUpdate', userUpdate);

        return res.status(200).send(userUpdate);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}