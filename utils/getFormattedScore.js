const { formatDistanceStrict } = require('date-fns');
const findUser = require('./findUser');

async function getFormattedScore(userToken) {
  const user = await findUser(userToken);

  if (!user.gameStartTimestamp || !user.gameFinishTimestamp) {
    return 'User has not finished a game';
  }

  return formatDistanceStrict(
    user.gameFinishTimestamp,
    user.gameStartTimestamp,
  );
}

module.exports = getFormattedScore;
