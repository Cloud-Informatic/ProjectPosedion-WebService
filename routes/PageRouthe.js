const express = require('express');
const authController = require('../controllers/RAuthController');
const pageController = require('../controllers/PageController');

const router = express.Router();
// Anasayfa
router.route('/').get(authController.getHomePage);
// Kullanıcı Sayfası
router.route('/user').get(authController.getUserPage);
// İmage Sayfası
router.route('/images').get(pageController.getimagePage);
// Text Sayfası
router.route('/text').get(pageController.gettextPage);
// Video Sayfası
router.route('/video').get(pageController.getvideoPage);
// Başka uzantılar için şifreleme
router.route('/order').get(pageController.getorderPage);



module.exports = router;