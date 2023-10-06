const express = require('express');
const router = express.Router();
const healthNewsValidation = require('../Validation/healthNewsValidation')

const healthNewsController = require('../controller/healthNewsController')

router.post('/create-news', healthNewsValidation.validateNews, healthNewsController.createNews)
router.post('/update-news', healthNewsValidation.validateUpdateNews, healthNewsController.updateNews)
router.get('/latest-news', healthNewsController.getAllNews)
router.get('/news-details/:id', healthNewsController.getNewsById)

module.exports = router