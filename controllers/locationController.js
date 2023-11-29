const asyncHandler = require('express-async-handler');

const Location = require('../models/location');

async function verifyLocationData(req, res) {
  const { x, y } = req.body.clickCoordinates;
  const { itemName } = req.body;

  // Check for coordinates and matching name
  const validLocation = await Location.findOne({
    $and: [
      { leftBorderCoordinate: { $lte: x } },
      { rightBorderCoordinate: { $gte: x } },
      { topBorderCoordinate: { $lte: y } },
      { bottomBorderCoordinate: { $gte: y } },
      { name: itemName },
    ],
  });
  console.log(validLocation);
  return res.send(validLocation ? 'true' : 'false');
}

exports.verifyLocation = [
  // TODO: sanitize?

  asyncHandler(async (req, res) => {
    verifyLocationData(req, res);
  }),
];
