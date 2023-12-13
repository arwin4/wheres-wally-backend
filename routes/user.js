const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Get session token
router.get('/session', userController.sendSessionToken);

// Get user token
router.get('/user', userController.sendUserToken);

module.exports = router;
