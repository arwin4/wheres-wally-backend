# Where's Wally?

This is a backend implementation of [The Odin Project's full stack _Where's Waldo?_ project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app).

[The frontend can be found here.](https://github.com/arwin4/wheres-wally-frontend)

It is a game in which the player must identify three 'sights' in an image of a RollerCoaster Tycoon amusement park. After finding all the sights, the user may enter their name to record their time and appear on the leaderboard.

This is a RESTful API which identifies users and tracks the progress of their games. It verifies attempts at identification and keeps track of the time it took them to find all the sights. Finally, it provides a leaderboard.

MongoDB serves as the database.

## Some other notable features

- Full test coverage of all endpoints using Postman
- Error handling for every database operation
- CORS enabled
- Uses appropriate HTTP verbs
