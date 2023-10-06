const express = require('express');
const router = express.Router();
const gymLocatorValidation = require('../Validation/gymLocatorValidation')

const gymLocatorController = require('../controller/gymLocatorController')

router.post('/create-gym', gymLocatorValidation.validateGymLocator, gymLocatorController.createGym)
router.get('/gyms', gymLocatorController.getGymByLocation)
router.get('/gym-details', gymLocatorController.getGymById)

module.exports = router