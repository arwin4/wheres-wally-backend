/* eslint-disable no-console */
const mongoose = require('mongoose');

// Import Mongo connection string
require('dotenv').config();

const mongoString = process.env.MONGODB_CONNECTION_STRING;

const Location = require('../models/location');

const slide = new Location({
  name: 'slide',
  topBorderCoordinate: 955,
  bottomBorderCoordinate: 1040,
  leftBorderCoordinate: 1490,
  rightBorderCoordinate: 1568,
});

const fountain = new Location({
  name: 'fountain',
  topBorderCoordinate: 693,
  leftBorderCoordinate: 1189,
  bottomBorderCoordinate: 772,
  rightBorderCoordinate: 1263,
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
    await Promise.all([slide.save(), fountain.save()]);
    console.log('Locations added to database.');
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
  console.log('Connection closed.');
}

main();
