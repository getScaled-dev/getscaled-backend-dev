const express = require('express')
const router = new express.Router()
const btoa = require('btoa');
const axios = require('axios');
const username = 'admin';
const password = '@SbPBUVW16yZA';
const authHeader = 'Basic ' + btoa(username + ':' + password);

// Set the Authorization header with the encoded credentials
const headers = {
    'Authorization': authHeader
};

const getContacts = async (req, res) => {
    // Make a GET request to the external API using Axios
    axios.get('https://marketing.getscaled.com/dev/api/contacts', { headers })
        .then(response => {
            // Return the response data from the external API
            res.json(response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data from the external API:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
};

const createContact = async (req, res) => {


    try {
        // Find the document by ID
        const doc = await LinkedinData2.findById(id);

        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Update the document with the new data
        doc.firstName = req.body.firstName || doc.firstName;
        doc.lastName = req.body.lastName || doc.lastName;
        doc.companyPhone = req.body.companyPhone || doc.companyPhone;
        doc.mobilePhone = req.body.mobilePhone || doc.mobilePhone;
        doc.companyName = req.body.companyName || doc.companyName;
        doc.jobTitle = req.body.jobTitle || doc.jobTitle;
        doc.dob = req.body.dob || doc.dob;
        doc.address = req.body.address || doc.address;
        doc.address2 = req.body.address2 || doc.address2;
        doc.city = req.body.city || doc.city;
        doc.state = req.body.state || doc.state;
        doc.zip = req.body.zip || doc.zip;
        doc.age = req.body.age || doc.age;
        doc.email = req.body.email || doc.email;

        // Save the updated document
        const updatedDoc = await doc.save();

        res.json(updatedDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = {

    getContacts

}