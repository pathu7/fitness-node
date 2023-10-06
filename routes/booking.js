const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth');
const bookingValidation = require('../Validation/bookingValidation')

const bookingController = require('../controller/bookingController')

router.post('/book-class', Auth, bookingValidation.validateBookClass, bookingController.BookClass)
router.get('/my-bookings', Auth,bookingController.getMyBookings)
router.get('/all-bookings', Auth,bookingController.getAllBookings)

module.exports = router