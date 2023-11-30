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
  items: {
    // required: true,
    type: Array,
  },
});

module.exports = mongoose.model('User', UserSchema);
