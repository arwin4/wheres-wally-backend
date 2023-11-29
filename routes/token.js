const express = require('express');

const router = express.Router();

const tokenController = require('../controllers/tokenController');

// Get session token
router.get('/session', tokenController.sendSessionToken);

module.exports = router;
