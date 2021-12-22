const express = require('express');
const authController = require('../controllers/RAuthController');
const pageController = require('../controllers/PageController');

const router = express.Router();

router.route('/walletid').post(authController.getwallet);
router.route('/codeverify').post(authController.codeVerification);
router.route('/image').post(pageController.setimagePage);
router.route('/video').post(pageController.setvideoPage);
router.route('/text').post(pageController.settextPage);
router.route('/order').post(pageController.setorderPage);


module.exports = router;