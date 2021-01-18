'use strict';

const Event = require('../models/event.model.js');
const User = require('../models/user.model.js');

const eventControllers = {};

eventControllers.getAll = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (e) {
    res.status = 500;
    // Further handle your error on the back-end
  }
};

module.exports = eventControllers;
