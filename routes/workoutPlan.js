const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth')
const workoutPlanValidation = require('../Validation/workoutPlanValidation')

const workoutPlanController = require('../controller/workoutPlanController')

router.post('/workout-plan', Auth, workoutPlanValidation.validateCreateWorkoutPlan, workoutPlanController.createWorkoutPlan)
router.put('/update-workout-plan', Auth, workoutPlanValidation.validateUpdateWorkoutPlan, workoutPlanController.updateWorkoutPlan)
router.get('/workout-plans', Auth, workoutPlanController.getAllWorkoutPlans)
router.get('/workout-plans-details/:id', Auth, workoutPlanController.getWorkoutPlansById)

module.exports = router;