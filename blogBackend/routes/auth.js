
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadFile = require('../config/multer');

router.post('/signup', uploadFile('profile').single('profileImage'), authController.signup);
router.post('/login', authController.login);

module.exports = router;