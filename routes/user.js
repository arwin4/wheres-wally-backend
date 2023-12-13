const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Get user token
router.get('/token', userController.sendUserToken);

// Set user name
router.put('/name', userController.setUserName);

module.exports = router;