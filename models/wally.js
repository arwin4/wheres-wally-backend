const mongoose = require('mongoose');

const WallySchema = mongoose.Schema({
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

module.exports = mongoose.model('Wally', WallySchema);
