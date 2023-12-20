const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  name: {
    type: String,
  },
  gameStartTimestamp: {
    type: Date,
  },
  gameFinishTimestamp: {
    type: Date,
  },
  wallies: {
    type: Array,
  },
});

module.exports = mongoose.model('User', UserSchema);
