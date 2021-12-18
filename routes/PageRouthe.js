const express = require('express');
const pageController = require('../controllers/AuthController');

const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/user').get(pageController.getUSerPage);

module.exports = router;