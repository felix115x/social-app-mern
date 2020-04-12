const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    avatar: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reqistrationdate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model('user', UserSchema);
