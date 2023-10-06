const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/uploadImage')
const Auth = require('../middleware/Auth')
const userValidation = require('../Validation/userValidation')

const UserController = require("../controller/userController")

router.post('/signup', userValidation.validateSignInUser ,UserController.user_signup)
router.post('/login', userValidation.validateLoginInUser,UserController.user_login)
router.get('/profile', Auth,UserController.getUserProfile)
router.put('/profile', Auth, uploadImage.profileImage, userValidation.validateUpdateUser ,UserController.updateUserProfile)

module.exports = router;