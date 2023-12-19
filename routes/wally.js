const express = require('express');

const router = express.Router();

const wallyController = require('../controllers/wallyController');

// Wallies
// Verify wally
router.put('/', wallyController.verifyWally);

module.exports = router;
