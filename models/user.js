const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  sessionId: {
    // required: true,
    type: String,
  },
  gameStartTimestamp: {
    type: Date,
  },
  gameFinishTimestamp: {
    type: Date,
  },
  wallies: {
    // required: true,
    type: Array,
  },
});

module.exports = mongoose.model('User', UserSchema);
