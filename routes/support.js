const express = require('express');
const router = express.Router();
const supportValidation = require('../Validation/supportValidation')

const supportController = require('../controller/supportController')

router.post('/create-faqs', supportValidation.validateFaqs,supportController.createFaqs)
router.get('/faqs', supportController.getAllFaqs)

router.post('/contact-support', supportValidation.validateContactSupport,supportController.createContactSupport)
router.get('/get-contact-support', supportController.getAllContactSupport)

module.exports = router