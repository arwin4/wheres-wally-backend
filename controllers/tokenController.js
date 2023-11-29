const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');

exports.sendSessionToken = asyncHandler((req, res) => {
  const sessionToken = randomUUID();
  res.send({ sessionToken });
});

exports.sendUserToken = asyncHandler((req, res) => {
  const userToken = randomUUID();
  res.send({ userToken });
});
