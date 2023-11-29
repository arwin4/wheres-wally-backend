const express = require('express');

const router = express.Router();

const tokenController = require('../controllers/tokenController');

// Get user token
router.get('/', tokenController.sendToken);

module.exports = router;
