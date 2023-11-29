const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  topBorderCoordinate: {
    required: true,
    type: Number,
  },
  bottomBorderCoordinate: {
    required: true,
    type: Number,
  },
  leftBorderCoordinate: {
    required: true,
    type: Number,
  },
  rightBorderCoordinate: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Location', LocationSchema);
