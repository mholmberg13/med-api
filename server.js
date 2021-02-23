const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express()
require('dotenv').config();

const cors = require('cors');

const db = mongoose.connection


// Environment Variables (Setting Up for Heroku)
const PORT = process.env.PORT || 3004
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/med3d-v2'




// Connect to Mongo
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }
// )

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => console.log('MongoDB connection established'))

// Middleware
app.use(express.json()); //use .json(), not .urlencoded()

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))


// Routes
const usersController = require('./controllers/users.js');
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())
app.use('/users', usersController);



app.listen(PORT, () => {
    console.log('Let\'s get things done on port', PORT)
  })