const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const eventSchema = require('./event.model.js');

const userSchema = new mongoose.Schema({
  events: {
    type: { String: [eventSchema] },
    required: true,
  },
  interests: {
    type: [String],
    required: false,
  },
  requestToken: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
