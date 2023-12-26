const asyncHandler = require('express-async-handler');
const {
  formatDistanceStrict,
  formatISO,
  formatDuration,
  parseISO,
  intervalToDuration,
} = require('date-fns');
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
    .map((user) => {
      const duration = intervalToDuration({
        start: user.gameStartTimestamp,
        end: user.gameFinishTimestamp,
      });

      return {
        key: user._id,
        userId: user.userId,
        name: user.name,
        duration,
        durationFormatted: formatDuration(duration, { delimiter: ' and ' }),
      };
    })
    .sort((a, b) => a.duration - b.duration);

  return res.send(usersSortedByScore);
});
