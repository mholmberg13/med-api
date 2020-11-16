const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connection


// Environment Variables (Setting Up for Heroku)
const PORT = process.env.PORT || 3004
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/merncrud'

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
)

// Middleware
app.use(express.json()); //use .json(), not .urlencoded()

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))


// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);

app.listen(PORT, () => {
    console.log('Let\'s get things done on port', PORT)
  })