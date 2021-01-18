const User = require('../models/user.model.js');
const Event = require('../models/event.model.js');

const userControllers = {};

userControllers.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (e) {
    res.status = 500;
    // Further handle your error on the back-end
  }
};

userControllers.postOne = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201);
    res.send(newUser);
  } catch (e) {
    res.status = 500;
    // Further handle your error on the back-end
  }
};

userControllers.findById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200);
    res.send(user);
  } catch (e) {
    res.status = 500;
  }
};

userControllers.addEventToUser = async (req, res) => {
  try {
    const date = req.params.date;
    const eventToAdd = new Event(req.body);

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

userControllers.toggleIsRequest = async (req, res) => {
  try {
    const eventID = req.params.eventID;
    const date = req.params.date;

    const targetUser = await User.findById(req.params.id);
    const targetDate = targetUser.events[date];
    const targetEvent = targetDate.find((event) => {
      return event._id == eventID;
    });

    targetEvent.isRequest = !targetEvent.isRequest;

    targetUser.markModified(`events.${date}`);

    await targetUser.save((err, doc) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(201);
    res.send(targetUser);
  } catch (e) {
    console.error('error: ', e);
  }
};

module.exports = userControllers;
