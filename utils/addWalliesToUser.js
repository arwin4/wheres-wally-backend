function addWalliesToUser(user) {
  const newUser = user;
  newUser.wallies = [
    {
      name: 'slide',
      foundByUser: false,
    },
    {
      name: 'fountain',
      foundByUser: false,
    },
  ];
  return newUser;
}

module.exports = addWalliesToUser;
