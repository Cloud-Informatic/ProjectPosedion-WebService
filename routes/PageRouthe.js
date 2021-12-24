const express = require('express');
const authController = require('../controllers/RAuthController');
const pageController = require('../controllers/PageController');

const router = express.Router();


router.route('/').get(authController.getHomePage);
router.route('/user').get(authController.getUserPage);
router.route('/images').get(pageController.getimagePage);
router.route('/text').get(pageController.gettextPage);
router.route('/video').get(pageController.getvideoPage);
router.route('/order').get(pageController.getorderPage);



module.exports = router;