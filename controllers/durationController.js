const asyncHandler = require('express-async-handler');

const findUser = require('../utils/findUser');

exports.setGameStartTimestamp = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req);
    user.gameStartTimestamp = Date.now();
    await user.save();
  } catch (error) {
    throw new Error(`Unable to start tracking this game's duration.`);
  }
  return res.send();
});

exports.setGameFinishTimestamp = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req);
    user.gameFinishTimestamp = Date.now();
    await user.save();
  } catch (error) {
    throw new Error(`Unable to end tracking this game's duration.`);
  }
  return res.send();
});
