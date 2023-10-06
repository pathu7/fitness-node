const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth')
const nutritionTrackerValidation = require('../Validation/nutritionTrackerValidation')

const nutritionTrackeController = require('../controller/nutritionTrackerController')

router.post('/meal', Auth, nutritionTrackerValidation.validateNutritionTracker, nutritionTrackeController.createMeal)
router.get('/nutrition', Auth, nutritionTrackeController.getAllMeal)
router.get('/nutrition/:id', Auth, nutritionTrackeController.getMealById)
router.put('/meal', Auth, nutritionTrackerValidation.validateUpdateMeal, nutritionTrackeController.updateMeal)

module.exports = router