const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const addWalliesToUser = require('../utils/addWalliesToUser');
const findUser = require('../utils/findUser');

exports.sendSessionToken = asyncHandler((req, res) => {
  const sessionToken = randomUUID();
  res.send({ sessionToken });
});

exports.sendUserToken = asyncHandler(async (req, res) => {
  const userToken = randomUUID();

  // Add user to database
  try {
    let user = new User({
      userId: userToken,
    });

    user = addWalliesToUser(user);

    await user.save();
  } catch (error) {
    throw new Error('Unable to add new user to database');
  }
  res.send({ userToken });
});

exports.setUserName = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req);
    const { name } = req.body;

    user.name = name;
    user.save();

    return res.send();
  } catch (err) {
    return res.status(500).send('Unable to update user name');
  }
});
