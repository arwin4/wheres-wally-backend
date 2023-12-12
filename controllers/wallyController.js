const asyncHandler = require('express-async-handler');

// Models
const Wally = require('../models/wally');

// Utils
const findUser = require('../utils/findUser');

// Check for coordinates and matching name
async function verifyWallyData(req) {
  const { x, y } = req.body.clickCoordinates;
  const { wallyName } = req.body;

  const validWally = await Wally.findOne({
    $and: [
      { leftBorderCoordinate: { $lte: x } },
      { rightBorderCoordinate: { $gte: x } },
      { topBorderCoordinate: { $lte: y } },
      { bottomBorderCoordinate: { $gte: y } },
      { name: wallyName },
    ],
  });
  if (validWally) return true;
  return false;
}

exports.verifyWally = asyncHandler(async (req, res) => {
  // TODO: sanitize?

  const wallyValid = await verifyWallyData(req);
  if (!wallyValid) return res.send({ wallyValid: false, gameFinished: false });

  const { wallyName } = req.body;
  const user = await findUser(req);

  // Mark wally as found
  try {
    const foundWally = user.wallies.find((wally) => wally.name === wallyName);
    foundWally.foundByUser = true;
    user.markModified('wallies'); // Mongoose won't detect the change without this
    await user.save();
  } catch (error) {
    throw new Error('Unable to update found wallies in database');
  }

  // All wallies found
  if (user.wallies.every((wally) => wally.foundByUser)) {
    return res.send({ wallyValid: true, gameFinished: true });
  }

  // Not all wallies have been found yet
  return res.send({ wallyValid: true, gameFinished: false });
});

exports.resetWallies = asyncHandler(async (req, res) => {
  const user = await findUser(req);
  try {
    user.wallies.forEach((wally) => {
      const currentWally = wally;
      currentWally.foundByUser = false;
    });
    user.markModified('wallies');
    await user.save();
  } catch (error) {
    throw new Error('Unable to reset found wallies for this user');
  }
  return res.send();
});
