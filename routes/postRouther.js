const express = require('express');
const authController = require('../controllers/RAuthController');
const pageController = require('../controllers/PageController');

const router = express.Router();

router.route('/walletid').post(authController.getwallet);
router.route('/codeverify').post(authController.codeVerification);
router.route('/image').post(pageController.setimagePage);


module.exports = router;