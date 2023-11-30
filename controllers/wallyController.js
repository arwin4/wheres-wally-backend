const asyncHandler = require('express-async-handler');

// Models
const Wally = require('../models/wally');
const User = require('../models/user');

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

  const { userToken, wallyName } = req.body;
  let currentUser;

  // Find user
  try {
    currentUser = await User.findOne({ userId: userToken }).exec();
  } catch (error) {
    throw new Error('Unable to find user in database');
  }

  // Mark wally as found
  try {
    const foundWally = currentUser.wallies.find(
      (wally) => wally.name === wallyName,
    );
    foundWally.foundByUser = true;
    currentUser.markModified('wallies'); // Mongoose won't detect the change without this
    await currentUser.save();
  } catch (error) {
    throw new Error('Unable to update found wallies in database');
  }

  // All wallies found
  if (currentUser.wallies.every((wally) => wally.foundByUser)) {
    return res.send({ wallyValid: true, gameFinished: true });
  }

  // Not all wallies have been found yet
  return res.send({ wallyValid: true, gameFinished: false });
});
