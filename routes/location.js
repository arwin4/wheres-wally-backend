const express = require('express');

const router = express.Router();

const locationController = require('../controllers/locationController');

// Locations
// Verify location
router.put('/', locationController.verifyLocation);

module.exports = router;
