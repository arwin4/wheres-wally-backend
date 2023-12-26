const { formatDuration, intervalToDuration } = require('date-fns');
const findUser = require('./findUser');

async function getFormattedScore(userId) {
  const user = await findUser(userId);

  if (!user.gameStartTimestamp || !user.gameFinishTimestamp) {
    return 'User has not finished a game';
  }

  const duration = intervalToDuration({
    start: user.gameStartTimestamp,
    end: user.gameFinishTimestamp,
  });

  return formatDuration(duration, { delimiter: ' and ' });
}

module.exports = getFormattedScore;
