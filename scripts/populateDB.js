/* eslint-disable no-console */
const mongoose = require('mongoose');

// Import Mongo connection string
require('dotenv').config();

const mongoString = process.env.MONGODB_CONNECTION_STRING;

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const admin = new User({
  username: 'admin',
  password: 'pass',
  firstName: 'Arwin',
  lastName: 'Yella',
  isAdmin: true,
});

const firstPost = new Post({
  title: 'My first blog post',
  author: admin._id,
  content: 'Bla bla bla lorem ipsum dolor amet',
});

const commentOnFirstPost = new Comment({
  post: firstPost._id,
  author: 'Annoying commenter',
  content: 'First!',
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
    await admin.save();
    console.log('Admin added to database.');
    await firstPost.save();
    console.log('Sample post added.');
    await commentOnFirstPost.save();
    console.log('Sample comment added.');
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
  console.log('Connection closed.');
}

main();
