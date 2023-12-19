const asyncHandler = require('express-async-handler');
const { formatDistanceStrict } = require('date-fns');
const User = require('../models/user');

exports.sendLeaderboard = asyncHandler(async (req, res) => {
  const usersWithFinishedGames = await User.find(
    {
      gameStartTimestamp: { $exists: true },
      gameFinishTimestamp: { $exists: true },
      name: { $exists: true },
    },
    'name userId gameStartTimestamp gameFinishTimestamp',
  ).exec();

  const usersSortedByScore = usersWithFinishedGames
    .map((user) => ({
      key: user._id,
      userId: user.userId,
      name: user.name,
      duration: user.gameFinishTimestamp - user.gameStartTimestamp,
      durationFormatted: formatDistanceStrict(
        user.gameFinishTimestamp,
        user.gameStartTimestamp,
      ),
    }))
    .sort((a, b) => a.duration - b.duration);

  return res.send(usersSortedByScore);
});
