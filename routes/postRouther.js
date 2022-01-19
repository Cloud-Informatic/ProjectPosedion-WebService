const express = require('express');
const authController = require('../controllers/RAuthController');
const pageController = require('../controllers/PageController');

const router = express.Router();

// Kullanıcının wallet ID değerini kontol etmek veya değişiklik yapmak için tutmaktayız
router.route('/walletid').post(authController.getwallet);
router.route('/codeverify').post(authController.codeVerification);
// İmage gönderim controllerı
router.route('/image').post(pageController.setimagePage);
// video gönderim controllerı
router.route('/video').post(pageController.setvideoPage);
// text gönderim controllerı
router.route('/text').post(pageController.settextPage);
// order gönderim controllerı
router.route('/order').post(pageController.setorderPage);

router.route('/enCrypto').post(pageController.enCrypto);
router.route('/deCrypto').post(pageController.deCrypto);

module.exports = router;