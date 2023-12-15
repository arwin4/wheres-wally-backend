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
  const wallyValid = await verifyWallyData(req);
  if (!wallyValid) return res.send({ wallyValid: false, gameFinished: false });

  const { wallyName } = req.body;
  const user = await findUser(req.body.userToken);

  // Mark wally as found
  try {
    const foundWally = user.wallies.find((wally) => wally.name === wallyName);

    if (foundWally.foundByUser) {
      return res.send({
        wallyValid: true,
        wallyAlreadyFound: true,
        gameFinished: false,
      });
    }

    foundWally.foundByUser = true;
    user.markModified('wallies'); // Mongoose won't detect the change without this
    await user.save();
  } catch (error) {
    throw new Error('Unable to update found wallies in database');
  }

  // Get wally's center coordinates, used for marking on the canvas
  let centerCoordinates;
  try {
    const foundWally = await Wally.findOne({ name: wallyName }).exec();
    centerCoordinates = foundWally.centerCoordinates;
  } catch (error) {
    throw new Error('Unable to get the center coordinates for this wally');
  }

  // All wallies found
  if (user.wallies.every((wally) => wally.foundByUser)) {
    return res.send({
      wallyValid: true,
      wallyAlreadyFound: false,
      centerCoordinates,
      gameFinished: true,
    });
  }

  // Not all wallies have been found yet
  return res.send({
    wallyValid: true,
    wallyAlreadyFound: false,
    centerCoordinates,
    gameFinished: false,
  });
});

exports.resetWallies = asyncHandler(async (req, res) => {
  const user = await findUser(req.body.userToken);
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
