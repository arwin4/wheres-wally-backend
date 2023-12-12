const express = require('express');

const router = express.Router();

const durationController = require('../controllers/durationController');

router.put('/start', durationController.setGameStartTimestamp);

router.put('/finish', durationController.setGameFinishTimestamp);

module.exports = router;
