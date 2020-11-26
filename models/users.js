const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    displayName: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6}
});

module.exports = User = mongoose.model('user', UserSchema);