/* eslint-disable no-console */
const mongoose = require('mongoose');

// Import Mongo connection string
require('dotenv').config();

const mongoString = process.env.MONGODB_CONNECTION_STRING;

const Wally = require('../models/wally');

const slide = new Wally({
  name: 'slide',
  topBorderCoordinate: 925,
  bottomBorderCoordinate: 1075,
  leftBorderCoordinate: 1460,
  rightBorderCoordinate: 1600,
  centerCoordinates: {
    top: 949,
    left: 1480,
  },
});

const fountain = new Wally({
  name: 'fountain',
  topBorderCoordinate: 655,
  leftBorderCoordinate: 1155,
  bottomBorderCoordinate: 800,
  rightBorderCoordinate: 1285,
  centerCoordinates: {
    top: 686,
    left: 1174,
  },
});

const lonelyIsland = new Wally({
  name: 'lonely island',
  topBorderCoordinate: 906,
  leftBorderCoordinate: 294,
  bottomBorderCoordinate: 1077,
  rightBorderCoordinate: 439,
  centerCoordinates: {
    top: 955,
    left: 317,
  },
});

async function main() {
  console.log('Connecting to MongoDB Atlas...');
  try {
    await mongoose.connect(mongoString);
  } catch (error) {
    console.log(error);
  }
  console.log('Connected. Populating database...');
  try {
    await Promise.all([slide.save(), fountain.save(), lonelyIsland.save()]);
    console.log('Wallies added to database.');
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
  console.log('Connection closed.');
}

main();
