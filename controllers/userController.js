const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const addWalliesToUser = require('../utils/addWalliesToUser');
const findUser = require('../utils/findUser');
const getFormattedScore = require('../utils/getFormattedScore');

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
  return res.send({ userToken });
});

exports.setUserName = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req.body.userToken);
    const { name } = req.body;

    user.name = name;
    user.save();

    return res.send();
  } catch (err) {
    return res.status(500).send('Unable to update user name');
  }
});

exports.getUserScore = asyncHandler(async (req, res) => {
  try {
    const formattedScore = await getFormattedScore(req.params.userToken);
    return res.send({ formattedScore });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
