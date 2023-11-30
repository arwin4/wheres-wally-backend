const asyncHandler = require('express-async-handler');

// Models
const Location = require('../models/location');
const User = require('../models/user');

// Check for coordinates and matching name
async function verifyLocationData(req) {
  const { x, y } = req.body.clickCoordinates;
  const { itemName } = req.body;

  const validLocation = await Location.findOne({
    $and: [
      { leftBorderCoordinate: { $lte: x } },
      { rightBorderCoordinate: { $gte: x } },
      { topBorderCoordinate: { $lte: y } },
      { bottomBorderCoordinate: { $gte: y } },
      { name: itemName },
    ],
  });
  if (validLocation) return true;
  return false;
}

exports.verifyLocation = asyncHandler(async (req, res) => {
  // TODO: sanitize?

  const itemValid = await verifyLocationData(req);
  if (!itemValid) return res.send({ itemValid: false, gameFinished: false });

  const { userToken, itemName } = req.body;
  let currentUser;

  try {
    currentUser = await User.findOne({ userId: userToken }).exec();
  } catch (error) {
    throw new Error('Unable to find user in database');
  }

  try {
    const foundItem = currentUser.items.find((item) => item.name === itemName);
    foundItem.foundByUser = true;
    currentUser.markModified('items'); // Mongoose won't detect the change without this
    await currentUser.save();
  } catch (error) {
    throw new Error('Unable to update found items in database');
  }

  if (currentUser.items.every((item) => item.foundByUser))
    return res.send({ itemValid: true, gameFinished: true });

  return res.send({ itemValid: true, gameFinished: false });
});
