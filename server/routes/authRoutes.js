const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);//normal user
router.post('/login', authController.login); //normal user


module.exports = router;
