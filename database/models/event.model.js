const mongoose = require('./index.js');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
    maxLength: 8,
  },
  location: {
    //could end up using google location suggestions
    //would need to have type location with its own properties (longitude, latitude, postcode etc.)
    type: String,
    required: false,
  },
  isRequest: {
    type: Boolean,
    default: false,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
