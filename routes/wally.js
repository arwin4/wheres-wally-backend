const express = require('express');

const router = express.Router();

const wallyController = require('../controllers/wallyController');

// Wallies
// Verify wally
router.put('/', wallyController.verifyWally);

// Reset found wallies for user (for new game)
router.delete('/', wallyController.resetWallies);

module.exports = router;
