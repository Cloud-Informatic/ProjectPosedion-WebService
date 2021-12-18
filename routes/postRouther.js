const express = require('express');
const pageController = require('../controllers/AuthController');

const router = express.Router();

router.route('/walletid').post(pageController.getwallet);

module.exports = router;