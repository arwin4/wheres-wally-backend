const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');

exports.sendToken = asyncHandler((req, res) => {
  const userToken = randomUUID();
  res.send({ userToken });
});
