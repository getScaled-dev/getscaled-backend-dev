var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
});

module.exports = mongoose.model('Users', userSchema)