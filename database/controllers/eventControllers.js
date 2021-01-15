'use strict';

const Event = require('../models/event.model.js');

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

eventControllers.postOne = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201);
    res.send(newEvent);
  } catch (e) {
    res.status = 500;
    // Further handle your error on the back-end
  }
};

module.exports = eventControllers;
