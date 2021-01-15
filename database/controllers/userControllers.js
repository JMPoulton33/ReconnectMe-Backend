'use strict';

const User = require('../models/user.model.js');

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

module.exports = userControllers;
