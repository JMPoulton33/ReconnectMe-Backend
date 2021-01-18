const User = require('../models/user.model.js');
const Event = require('../models/event.model.js');

const requestControllers = {};

requestControllers.findById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200);
    res.send(user);
  } catch (e) {
    res.status = 500;
  }
};

requestControllers.addRequestToUser = async (req, res) => {
  try {
    const date = req.params.date;
    const eventToAdd = new Event(req.body);
    eventToAdd.isRequest = true;

    const targetUser = await User.findById(req.params.id);
    targetUser.events[date].push(eventToAdd);

    targetUser.markModified(`events.${date}`);

    const update = await targetUser.save((err, doc) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(201);
    res.send(update);
  } catch (e) {
    console.error('error: ', e);
  }
};

module.exports = requestControllers;
