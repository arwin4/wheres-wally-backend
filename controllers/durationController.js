const asyncHandler = require('express-async-handler');

const findUser = require('../utils/findUser');

exports.setGameStartTimestamp = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req.body.userToken);
    if (user.gameStartTimestamp) return res.sendStatus(204);
    user.gameStartTimestamp = Date.now();
    await user.save();
  } catch (error) {
    throw new Error(`Unable to start tracking this game's duration.`);
  }
  return res.send();
});

exports.setGameFinishTimestamp = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req.body.userToken);
    if (user.gameFinishTimestamp) return res.sendStatus(204);
    user.gameFinishTimestamp = Date.now();
    await user.save();
  } catch (error) {
    throw new Error(`Unable to end tracking this game's duration.`);
  }
  return res.send();
});
