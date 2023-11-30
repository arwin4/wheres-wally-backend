function addLocationsToUser(user) {
  const newUser = user;
  newUser.items = [
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

module.exports = addLocationsToUser;
