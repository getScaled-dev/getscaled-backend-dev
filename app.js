
var bodyParser = require('body-parser')
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
var cors = require('cors')
const fs = require('fs');
const mongoose = require('mongoose');
const router = express.Router();
require('./db/connention')
require('dotenv').config()

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Set up Mongoose connection to MongoDB
// mongoose.connect("mongodb+srv://tayyab:iFn1nDxK7oycutk5@cluster0.kbjvqmt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((res) => {
//         console.log('dB is connected')
//     })
//     .catch((err) => {
//         console.log('db is not connecting', err)
//     })
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema for the records to be saved
const recordSchema = new mongoose.Schema({
    fullName: String,
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    companyPhone: String,
    companyName: String,
    mobilePhone: String,
    dob: String,
    address: String,
    address2: String,
    jobTitle: String,
    age: String,
    city: String,
    state: String,
    source: String


}, { timestamps: true });

// Create a model based on the schema
const Record = mongoose.model('Record', recordSchema);

// Set up the Express app
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', require('./controller/auth'))
const auth = require('./helpers/index');
const path = require('path');

// Handle file uploads and saving records

app.post('/api/add-data', upload.single('csvFile'), (req, res) => {
    const results = [];
    let counter = 0;
    // Parse the CSV file
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            counter += 1;
            console.log(counter);
            // Add each row of data to the results array

            results.push(data);
        })
        .on('end', () => {
            // Save each record to the database
            Record.insertMany(results)
                .then(() => {
                    // Return a success response
                    res.status(200).send('Records saved to database');
                })
                .catch((err) => {
                    // Return an error response if there was a problem saving the records
                    console.error(err);
                    res.status(500).send('Error saving records to database');
                });
        });
});

// GET API with pagination and filters
app.get('/api/dashboard', async (req, res) => {
    const filter = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.itemsPerPage) || 100;
        console.log(req.query.nameValue, 'name value')
        let jobTitleValue = JSON.parse(req.query.jobTitleValue);
        // first name filters start
        if (req.query.firstName === 'like') {
            filter.firstName = { $regex: req.query.firstNameValue, $options: 'i' };
        }
        if (req.query.firstName === 'eq') {
            filter.firstName = { $in: req.query.firstNameValue }
        }
        if (req.query.firstName === 'notLike') {
            filter.firstName = { $not: { $regex: req.query.firstNameValue, $options: 'i' } };
        }
        if (req.query.firstName === 'isNot') {
            filter.firstName = { $ne: req.query.firstNameValue };
        }
        if (req.query.firstName === 'startsWith') {
            filter.firstName = { $regex: `^${req.query.firstNameValue}`, $options: 'i' };
        }
        if (req.query.firstName === 'endsWith') {
            filter.firstName = { $regex: `${req.query.firstNameValue}$`, $options: 'i' };
        }
        if (req.query.firstName === 'isBlank') {
            filter.firstName = { $exists: false, $ne: '' };
        }
        if (req.query.firstName === 'isNotBlank') {
            filter.firstName = { $exists: true, $ne: '' };
        }
        // first name filters end
        // compan Name filters 
        // first name filters start
        if (req.query.companyName === 'like') {
            filter.companyName = { $regex: req.query.firstNameValue, $options: 'i' };
        }
        if (req.query.companyName === 'eq') {
            filter.companyName = { $in: req.query.firstNameValue }
        }
        if (req.query.companyName === 'notLike') {
            filter.companyName = { $not: { $regex: req.query.firstNameValue, $options: 'i' } };
        }
        if (req.query.companyName === 'isNot') {
            filter.companyName = { $ne: req.query.firstNameValue };
        }
        if (req.query.companyName === 'startsWith') {
            filter.companyName = { $regex: `^${req.query.firstNameValue}`, $options: 'i' };
        }
        if (req.query.companyName === 'endsWith') {
            filter.companyName = { $regex: `${req.query.firstNameValue}$`, $options: 'i' };
        }
        if (req.query.companyName === 'isBlank') {
            filter.companyName = { $exists: false, $ne: '' };
        }
        if (req.query.companyName === 'isNotBlank') {
            filter.companyName = { $exists: true, $ne: '' };
        }
        // last name filters start
        if (req.query.lastName === 'like') {
            filter.lastName = { $regex: req.query.lastNameValue, $options: 'i' };
        }
        if (req.query.lastName === 'eq') {
            filter.lastName = { $in: req.query.lastNameValue }
        }
        if (req.query.lastName === 'notLike') {
            filter.lastName = { $not: { $regex: req.query.lastNameValue, $options: 'i' } };
        }
        if (req.query.lastName === 'isNot') {
            filter.lastName = { $ne: req.query.lastNameValue };
        }
        if (req.query.lastName === 'startsWith') {
            filter.lastName = { $regex: `^${req.query.lastNameValue}`, $options: 'i' };
        }
        if (req.query.lastName === 'endsWith') {
            filter.lastName = { $regex: `${req.query.lastNameValue}$`, $options: 'i' };
        }
        if (req.query.lastName === 'isBlank') {
            filter.lastName = { $exists: false, $ne: '' };
        }
        if (req.query.lastName === 'isNotBlank') {
            filter.lastName = { $exists: true, $ne: '' };
        }
        // last name filters end

        // email filters start
        if (req.query.email === 'like') {
            filter.email = { $regex: req.query.emailValue, $options: 'i' };
        }
        if (req.query.email === 'eq') {
            filter.email = { $in: req.query.emailValue }
        }
        if (req.query.email === 'notLike') {
            filter.email = { $not: { $regex: req.query.emailValue, $options: 'i' } };
        }
        if (req.query.email === 'isNot') {
            filter.email = { $ne: req.query.emailValue };
        }
        if (req.query.email === 'startsWith') {
            filter.email = { $regex: `^${req.query.emailValue}`, $options: 'i' };
        }
        if (req.query.email === 'endsWith') {
            filter.email = { $regex: `${req.query.emailValue}$`, $options: 'i' };
        }
        if (req.query.email === 'isBlank') {
            filter.email = { $exists: false, $ne: '' };
        }
        if (req.query.email === 'isNotBlank') {
            filter.email = { $exists: true, $ne: '' };
        }
        // email filters end

        // company phone filters start
        if (req.query.companyPhone === 'like') {
            filter.companyPhone = { $regex: req.query.companyPhoneValue, $options: 'i' };
        }
        if (req.query.companyPhone === 'eq') {
            filter.companyPhone = { $in: req.query.companyPhoneValue }
        }
        if (req.query.companyPhone === 'notLike') {
            filter.companyPhone = { $not: { $regex: req.query.companyPhoneValue, $options: 'i' } };
        }
        if (req.query.companyPhone === 'isNot') {
            filter.companyPhone = { $ne: req.query.companyPhoneValue };
        }
        if (req.query.companyPhone === 'startsWith') {
            filter.companyPhone = { $regex: `^${req.query.companyPhoneValue}`, $options: 'i' };
        }
        if (req.query.companyPhone === 'endsWith') {
            filter.companyPhone = { $regex: `${req.query.companyPhoneValue}$`, $options: 'i' };
        }
        if (req.query.companyPhone === 'isBlank') {
            filter.companyPhone = { $exists: false, $ne: '' };
        }
        if (req.query.companyPhone === 'isNotBlank') {
            filter.companyPhone = { $exists: true, $ne: '' };
        }
        // company phone filters end


        // mobile phone filters start
        if (req.query.mobilePhone === 'like') {
            filter.mobilePhone = { $regex: req.query.mobilePhoneValue, $options: 'i' };
        }
        if (req.query.mobilePhone === 'eq') {
            filter.mobilePhone = { $in: req.query.mobilePhoneValue }
        }
        if (req.query.mobilePhone === 'notLike') {
            filter.mobilePhone = { $not: { $regex: req.query.mobilePhoneValue, $options: 'i' } };
        }
        if (req.query.mobilePhone === 'isNot') {
            filter.mobilePhone = { $ne: req.query.mobilePhoneValue };
        }
        if (req.query.mobilePhone === 'startsWith') {
            filter.mobilePhone = { $regex: `^${req.query.mobilePhoneValue}`, $options: 'i' };
        }
        if (req.query.mobilePhone === 'endsWith') {
            filter.mobilePhone = { $regex: `${req.query.mobilePhoneValue}$`, $options: 'i' };
        }
        if (req.query.mobilePhone === 'isBlank') {
            filter.mobilePhone = { $exists: false, $ne: '' };
        }
        if (req.query.mobilePhone === 'isNotBlank') {
            filter.mobilePhone = { $exists: true, $ne: '' };
        }
        // mobile phone filters end

        // address filters start
        if (req.query.address === 'like') {
            filter.address = { $regex: req.query.addressValue, $options: 'i' };
        }
        if (req.query.address === 'eq') {
            filter.address = { $in: req.query.addressValue }
        }
        if (req.query.address === 'notLike') {
            filter.address = { $not: { $regex: req.query.addressValue, $options: 'i' } };
        }
        if (req.query.address === 'isNot') {
            filter.address = { $ne: req.query.addressValue };
        }
        if (req.query.address === 'startsWith') {
            filter.address = { $regex: `^${req.query.addressValue}`, $options: 'i' };
        }
        if (req.query.address === 'endsWith') {
            filter.address = { $regex: `${req.query.addressValue}$`, $options: 'i' };
        }
        if (req.query.address === 'isBlank') {
            filter.address = { $exists: false, $ne: '' };
        }
        if (req.query.address === 'isNotBlank') {
            filter.address = { $exists: true, $ne: '' };
        }
        // address filters end

        // address2 filters start
        if (req.query.address2 === 'like') {
            filter.address2 = { $regex: req.query.address2Value, $options: 'i' };
        }
        if (req.query.address2 === 'eq') {
            filter.address2 = { $in: req.query.address2Value }
        }
        if (req.query.address2 === 'notLike') {
            filter.address2 = { $not: { $regex: req.query.address2Value, $options: 'i' } };
        }
        if (req.query.address2 === 'isNot') {
            filter.address2 = { $ne: req.query.address2Value };
        }
        if (req.query.address2 === 'startsWith') {
            filter.address2 = { $regex: `^${req.query.address2Value}`, $options: 'i' };
        }
        if (req.query.address2 === 'endsWith') {
            filter.address2 = { $regex: `${req.query.address2Value}$`, $options: 'i' };
        }
        if (req.query.address2 === 'isBlank') {
            filter.address2 = { $exists: false, $ne: '' };
        }
        if (req.query.address2 === 'isNotBlank') {
            filter.address2 = { $exists: true, $ne: '' };
        }
        // jobTitle filters end
        if (req.query.jobTitle === 'like') {
            const jobTitlesArray = jobTitleValue;
            const jobTitles = jobTitlesArray.map(job => job.jobTitleValue);
            const regex = new RegExp(jobTitles.join('|'), 'i');
            filter.jobTitle = regex;
        }
        // job title filters start 


        // city filters start
        if (req.query.city === 'like') {
            filter.city = { $regex: req.query.cityValue, $options: 'i' };
        }
        if (req.query.city === 'eq') {
            filter.city = { $in: req.query.cityValue }
        }
        if (req.query.city === 'notLike') {
            filter.city = { $not: { $regex: req.query.cityValue, $options: 'i' } };
        }
        if (req.query.city === 'isNot') {
            filter.city = { $ne: req.query.cityValue };
        }
        if (req.query.city === 'startsWith') {
            filter.city = { $regex: `^${req.query.cityValue}`, $options: 'i' };
        }
        if (req.query.city === 'endsWith') {
            filter.city = { $regex: `${req.query.cityValue}$`, $options: 'i' };
        }
        if (req.query.city === 'isBlank') {
            filter.city = { $exists: false, $ne: '' };
        }
        if (req.query.city === 'isNotBlank') {
            filter.city = { $exists: true, $ne: '' };
        }
        // address2 filters end

        // city filters start
        if (req.query.state === 'like') {
            filter.state = { $regex: req.query.stateValue, $options: 'i' };
        }
        if (req.query.state === 'eq') {
            filter.state = { $in: req.query.stateValue }
        }
        if (req.query.state === 'notLike') {
            filter.state = { $not: { $regex: req.query.stateValue, $options: 'i' } };
        }
        if (req.query.state === 'isNot') {
            filter.state = { $ne: req.query.stateValue };
        }
        if (req.query.state === 'startsWith') {
            filter.state = { $regex: `^${req.query.stateValue}`, $options: 'i' };
        }
        if (req.query.state === 'endsWith') {
            filter.state = { $regex: `${req.query.stateValue}$`, $options: 'i' };
        }
        if (req.query.state === 'isBlank') {
            filter.state = { $exists: false, $ne: '' };
        }
        if (req.query.state === 'isNotBlank') {
            filter.state = { $exists: true, $ne: '' };
        }
        // state filters end


        // age filters start
        if (req.query.age === 'lte') {
            filter.age = { $lte: req.query.ageStartValue }
        }
        if (req.query.age === 'gte') {
            filter.age = { $gte: req.query.ageStartValue }
        }
        if (req.query.age === 'between') {
            filter.age = { $gte: req.query.ageStartValue, $lte: req.query.ageEndValue };
        }


        if (req.query.export) {

            const data = await Record.find(filter);
            // Convert data to CSV format
            console.log('=========export========')
            const CsvParser = require("json2csv").Parser;
            var exportData = [];

            data.forEach((user) => {
                const {

                    firstName,
                    lastName,
                    email,
                    companyPhone,
                    mobilePhone,
                    companyName,
                    jobTitle,
                    dob,
                    age,
                    address,
                    address2,
                    city,
                    state,
                    zip,
                } = user;
                exportData.push({

                    firstName,
                    lastName,
                    email,
                    companyPhone,
                    mobilePhone,
                    companyName,
                    jobTitle,
                    dob,
                    age,
                    address,
                    address2,
                    city,
                    state,
                    zip,
                });
            });

            const fields = [
                "fullName",
                "firstName",
                "lastName",
                "email",
                "companyPhone",
                "mobilePhone",
                "companyName",
                "jobTitle",
                "dob",
                "age",
                "address",
                "address 2",
                "city",
                "state",
                "zip code",
            ];

            const csvParser = new CsvParser({ fields });

            const csvData = csvParser.parse(exportData);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                "Content-Disposition",
                "attachment: filename=userData.csv"
            );
            res.status(200).end(csvData);
        } else {
            console.log(filter)
            const query = Record.find(filter)
                .skip((page - 1) * limit)
                .limit(parseInt(limit));

            const results = await query.exec();


            const count = await Record.countDocuments(filter);

            res.status(200).json({
                data: results,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                count: count
            });
        }



    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/update-data', async (req, res) => {
    const id = req.query.id;

    try {
        // Find the document by ID
        const doc = await Record.findById(id);

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
});

app.delete('/delete-records', async (req, res) => {
    try {
        const idsToDelete = req.body; // Assumes that the client sends an array of IDs in the request body
        const result = await Record.deleteMany({ _id: { $in: idsToDelete.id } });
        res.json({ message: `${result} records deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.timeout = 2000000;
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
