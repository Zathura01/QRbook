const mongoose = require('mongoose');

const userNew = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    userStatus: { // Here is the boolean column
        type: Number,
        required: false,
        default: 0 // Optional: You can set a default value
    }
});

module.exports = mongoose.model('New', userNew);
