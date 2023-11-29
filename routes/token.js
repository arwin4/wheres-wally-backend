const express = require('express');

const router = express.Router();

const tokenController = require('../controllers/tokenController');

// Get session token
router.get('/session', tokenController.sendSessionToken);

// Get user token
router.get('/user', tokenController.sendUserToken);

module.exports = router;
