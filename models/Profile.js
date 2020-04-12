const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    interests: {
        type: [String],
        required: false
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
