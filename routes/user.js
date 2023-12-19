const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const durationController = require('../controllers/durationController');
const wallyController = require('../controllers/wallyController');

// ID
// Get user token
router.get('/token', userController.sendUserId);

// Set user name
router.put('/:id/name', userController.setUserName);

// DURATION
// Set start timestamp
router.put('/:id/duration/start', durationController.setGameStartTimestamp);

// Set finish timestamp
router.put('/:id/duration/finish', durationController.setGameFinishTimestamp);

// Get user's score
router.get('/:id/score/', userController.getUserScore);

// Reset found wallies for user (for new game)
router.delete('/:id/wallies', wallyController.resetWallies);

module.exports = router;
