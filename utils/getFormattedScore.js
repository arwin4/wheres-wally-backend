const { formatDistanceStrict } = require('date-fns');
const findUser = require('./findUser');

async function getFormattedScore(userId) {
  const user = await findUser(userId);

  if (!user.gameStartTimestamp || !user.gameFinishTimestamp) {
    return 'User has not finished a game';
  }

  return formatDistanceStrict(
    user.gameFinishTimestamp,
    user.gameStartTimestamp,
  );
}

module.exports = getFormattedScore;
