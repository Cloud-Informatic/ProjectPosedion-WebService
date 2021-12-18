const express = require('express');
const pageController = require('../controllers/AuthController');

const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/user').get(pageController.getUSerPage);
router.route('/image').get(pageController.getimagePage);
router.route('/text').get(pageController.gettextPage);
router.route('/video').get(pageController.getvideoPage);
router.route('/order').get(pageController.getorderPage);



module.exports = router;