const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String
});

module.exports = mongoose.model('Users', UserSchema);