const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/uploadImage')
const communityValidation = require('../Validation/communityValidation')

const communityController = require('../controller/communityController')

router.post('/post', uploadImage.communityImage,communityValidation.validateCreateCommunity, communityController.createCommunity)
router.get('/community-feed', communityController.getAllCommunity)

module.exports = router