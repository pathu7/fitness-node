const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/uploadImage')
const Auth = require('../middleware/Auth');
const exerciseValidation = require('../Validation/exerciseValidation')

const exerciseController = require('../controller/exerciseController')

router.post('/create-exercise', Auth, uploadImage.exerciseMedia, exerciseValidation.validateCreateExercise, exerciseController.createExercise);
router.put('/update-exercise', Auth, uploadImage.exerciseMedia, exerciseValidation.validateUpdateExercise, exerciseController.updateExercise);
router.get('/exercises', Auth, exerciseController.getAllExercise)
router.get('/exercise-details', Auth, exerciseController.getExerciseById)

module.exports = router