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





module.exports = {

    getContacts

}