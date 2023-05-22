const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({
    fullName: {
        type: String,
        index: true
    },
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },

    email: {
        type: String,
        index: true
    },
    companyPhone: String,
    companyName: {
        type: String,
        index: true
    },
    mobilePhone: {
        type: String,
        index: true
    },
    dob: String,
    address: String,
    address2: String,
    jobTitle: String,
    age: {
        type: String,
        index: true
    },
    city: {
        type: String,
        index: true
    },
    state: {
        type: String,
        index: true
    },
    source: String


}, { timestamps: true });

// Create a model based on the schema
const LinkedinData = mongoose.model('LinkedinData', recordSchema);
module.exports = LinkedinData;