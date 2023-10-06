const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth');
const classValidation = require('../Validation/classValidation')

const classController = require('../controller/classController')

router.post('/create-class', Auth, classValidation.validateCreateClass, classController.createClass)
router.get('/classes-schedule', classController.getAllClasses)

module.exports = router