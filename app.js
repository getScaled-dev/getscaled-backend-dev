
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
    const firstName = req.query.firstName
    const firstNameValue = req.query.firstNameValue
    const lastName = req.query.lastName
    const lastNameValue = req.query.lastNameValue
    const email = req.query.email
    const emailValue = req.query.emailValue
    const jobTitle = req.query.jobTitle
    const jobTitleValue = req.query.jobTitleValue
    const mobilePhone = req.query.mobilePhone
    const mobilePhoneValue = req.query.mobilePhoneValue
    const city = req.query.city
    const cityValue = req.query.cityValue
    const state = req.query.state
    const stateValue = req.query.stateValue
    const companyName = req.query.companyName
    const companyNameValue = req.query.companyNameValue
    const companyPhone = req.query.companyPhone
    const companyPhoneValue = req.query.companyPhoneValue
    const address = req.query.address
    const addressValue = req.query.addressValue
    const address2 = req.query.address2

    const address2Value = req.query.address2Value
    const age = req.query.age
    const ageEndValue = req.query.ageEndValue
    const ageStartValue = req.query.ageStartValue





















    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.itemsPerPage) || 100;

        let jobTitleValue = JSON.parse(req.query.jobTitleValue);
        // first name filters start
        if (firstName === 'like') {
            filter.firstName = { $regex: firstNameValue, $options: 'i' };
        }
        if (firstName === 'eq') {
            filter.firstName = { $in: firstNameValue }
        }
        if (firstName === 'notLike') {
            filter.firstName = { $not: { $regex: firstNameValue, $options: 'i' } };
        }
        if (firstName === 'isNot') {
            filter.firstName = { $ne: firstNameValue };
        }
        if (firstName === 'startsWith') {
            filter.firstName = { $regex: `^${firstNameValue}`, $options: 'i' };
        }
        if (firstName === 'endsWith') {
            filter.firstName = { $regex: `${firstNameValue}$`, $options: 'i' };
        }
        if (firstName === 'isBlank') {
            filter.firstName = { $exists: false, $ne: '' };
        }
        if (firstName === 'isNotBlank') {
            filter.firstName = { $exists: true, $ne: '' };
        }
        // first name filters end
        // compan Name filters 
        // first name filters start
        if (companyName === 'like') {
            filter.companyName = { $regex: companyNameValue, $options: 'i' };
        }
        if (companyName === 'eq') {
            filter.companyName = { $in: companyNameValue }
        }
        if (companyName === 'notLike') {
            filter.companyName = { $not: { $regex: companyNameValue, $options: 'i' } };
        }
        if (companyName === 'isNot') {
            filter.companyName = { $ne: companyNameValue };
        }
        if (companyName === 'startsWith') {
            filter.companyName = { $regex: `^${companyNameValue}`, $options: 'i' };
        }
        if (companyName === 'endsWith') {
            filter.companyName = { $regex: `${companyNameValue}$`, $options: 'i' };
        }
        if (companyName === 'isBlank') {
            filter.companyName = { $exists: false, $ne: '' };
        }
        if (companyName === 'isNotBlank') {
            filter.companyName = { $exists: true, $ne: '' };
        }
        // last name filters start
        if (lastName === 'like') {
            filter.lastName = { $regex: lastNameValue, $options: 'i' };
        }
        if (lastName === 'eq') {
            filter.lastName = { $in: lastNameValue }
        }
        if (lastName === 'notLike') {
            filter.lastName = { $not: { $regex: lastNameValue, $options: 'i' } };
        }
        if (lastName === 'isNot') {
            filter.lastName = { $ne: lastNameValue };
        }
        if (lastName === 'startsWith') {
            filter.lastName = { $regex: `^${lastNameValue}`, $options: 'i' };
        }
        if (lastName === 'endsWith') {
            filter.lastName = { $regex: `${lastNameValue}$`, $options: 'i' };
        }
        if (lastName === 'isBlank') {
            filter.lastName = { $exists: false, $ne: '' };
        }
        if (lastName === 'isNotBlank') {
            filter.lastName = { $exists: true, $ne: '' };
        }
        // last name filters end

        // email filters start
        if (email === 'like') {
            filter.email = { $regex: emailValue, $options: 'i' };
        }
        if (email === 'eq') {
            filter.email = { $in: emailValue }
        }
        if (email === 'notLike') {
            filter.email = { $not: { $regex: emailValue, $options: 'i' } };
        }
        if (email === 'isNot') {
            filter.email = { $ne: emailValue };
        }
        if (email === 'startsWith') {
            filter.email = { $regex: `^${emailValue}`, $options: 'i' };
        }
        if (email === 'endsWith') {
            filter.email = { $regex: `${emailValue}$`, $options: 'i' };
        }
        if (email === 'isBlank') {
            filter.email = { $exists: false, $ne: '' };
        }
        if (email === 'isNotBlank') {
            filter.email = { $exists: true, $ne: '' };
        }
        // email filters end

        // company phone filters start
        if (companyPhone === 'like') {
            filter.companyPhone = { $regex: companyPhoneValue, $options: 'i' };
        }
        if (companyPhone === 'eq') {
            filter.companyPhone = { $in: companyPhoneValue }
        }
        if (companyPhone === 'notLike') {
            filter.companyPhone = { $not: { $regex: companyPhoneValue, $options: 'i' } };
        }
        if (companyPhone === 'isNot') {
            filter.companyPhone = { $ne: companyPhoneValue };
        }
        if (companyPhone === 'startsWith') {
            filter.companyPhone = { $regex: `^${companyPhoneValue}`, $options: 'i' };
        }
        if (companyPhone === 'endsWith') {
            filter.companyPhone = { $regex: `${companyPhoneValue}$`, $options: 'i' };
        }
        if (companyPhone === 'isBlank') {
            filter.companyPhone = { $exists: false, $ne: '' };
        }
        if (companyPhone === 'isNotBlank') {
            filter.companyPhone = { $exists: true, $ne: '' };
        }
        // company phone filters end


        // mobile phone filters start
        if (mobilePhone === 'like') {
            filter.mobilePhone = { $regex: mobilePhoneValue, $options: 'i' };
        }
        if (mobilePhone === 'eq') {
            filter.mobilePhone = { $in: mobilePhoneValue }
        }
        if (mobilePhone === 'notLike') {
            filter.mobilePhone = { $not: { $regex: mobilePhoneValue, $options: 'i' } };
        }
        if (mobilePhone === 'isNot') {
            filter.mobilePhone = { $ne: mobilePhoneValue };
        }
        if (mobilePhone === 'startsWith') {
            filter.mobilePhone = { $regex: `^${mobilePhoneValue}`, $options: 'i' };
        }
        if (mobilePhone === 'endsWith') {
            filter.mobilePhone = { $regex: `${mobilePhoneValue}$`, $options: 'i' };
        }
        if (mobilePhone === 'isBlank') {
            filter.mobilePhone = { $exists: false, $ne: '' };
        }
        if (mobilePhone === 'isNotBlank') {
            filter.mobilePhone = { $exists: true, $ne: '' };
        }
        // mobile phone filters end

        // address filters start
        if (address === 'like') {
            filter.address = { $regex: addressValue, $options: 'i' };
        }
        if (address === 'eq') {
            filter.address = { $in: addressValue }
        }
        if (address === 'notLike') {
            filter.address = { $not: { $regex: addressValue, $options: 'i' } };
        }
        if (address === 'isNot') {
            filter.address = { $ne: addressValue };
        }
        if (address === 'startsWith') {
            filter.address = { $regex: `^${addressValue}`, $options: 'i' };
        }
        if (address === 'endsWith') {
            filter.address = { $regex: `${addressValue}$`, $options: 'i' };
        }
        if (address === 'isBlank') {
            filter.address = { $exists: false, $ne: '' };
        }
        if (address === 'isNotBlank') {
            filter.address = { $exists: true, $ne: '' };
        }
        // address filters end

        // address2 filters start
        if (address2 === 'like') {
            filter.address2 = { $regex: address2Value, $options: 'i' };
        }
        if (address2 === 'eq') {
            filter.address2 = { $in: address2Value }
        }
        if (address2 === 'notLike') {
            filter.address2 = { $not: { $regex: address2Value, $options: 'i' } };
        }
        if (address2 === 'isNot') {
            filter.address2 = { $ne: address2Value };
        }
        if (address2 === 'startsWith') {
            filter.address2 = { $regex: `^${address2Value}`, $options: 'i' };
        }
        if (address2 === 'endsWith') {
            filter.address2 = { $regex: `${address2Value}$`, $options: 'i' };
        }
        if (address2 === 'isBlank') {
            filter.address2 = { $exists: false, $ne: '' };
        }
        if (address2 === 'isNotBlank') {
            filter.address2 = { $exists: true, $ne: '' };
        }
        // jobTitle filters end
        if (jobTitle === 'like') {
            const jobTitlesArray = jobTitleValue;
            const jobTitles = jobTitlesArray.map(job => job.jobTitleValue);
            const regex = new RegExp(jobTitles.join('|'), 'i');
            filter.jobTitle = regex;
        }
        // job title filters start 


        // city filters start
        if (city === 'like') {
            filter.city = { $regex: cityValue, $options: 'i' };
        }
        if (city === 'eq') {
            filter.city = { $in: cityValue }
        }
        if (city === 'notLike') {
            filter.city = { $not: { $regex: cityValue, $options: 'i' } };
        }
        if (city === 'isNot') {
            filter.city = { $ne: cityValue };
        }
        if (city === 'startsWith') {
            filter.city = { $regex: `^${cityValue}`, $options: 'i' };
        }
        if (city === 'endsWith') {
            filter.city = { $regex: `${cityValue}$`, $options: 'i' };
        }
        if (city === 'isBlank') {
            filter.city = { $exists: false, $ne: '' };
        }
        if (city === 'isNotBlank') {
            filter.city = { $exists: true, $ne: '' };
        }
        // address2 filters end

        // city filters start
        if (state === 'like') {
            filter.state = { $regex: stateValue, $options: 'i' };
        }
        if (state === 'eq') {
            filter.state = { $in: stateValue }
        }
        if (state === 'notLike') {
            filter.state = { $not: { $regex: stateValue, $options: 'i' } };
        }
        if (state === 'isNot') {
            filter.state = { $ne: stateValue };
        }
        if (state === 'startsWith') {
            filter.state = { $regex: `^${stateValue}`, $options: 'i' };
        }
        if (state === 'endsWith') {
            filter.state = { $regex: `${stateValue}$`, $options: 'i' };
        }
        if (state === 'isBlank') {
            filter.state = { $exists: false, $ne: '' };
        }
        if (state === 'isNotBlank') {
            filter.state = { $exists: true, $ne: '' };
        }
        // state filters end


        // age filters start
        if (age === 'lte') {
            filter.age = { $lte: ageStartValue }
        }
        if (age === 'gte') {
            filter.age = { $gte: ageStartValue }
        }
        if (age === 'between') {
            filter.age = { $gte: ageStartValue, $lte: ageEndValue };
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
// app.get('/fullname', async (req, res) => {
//     try {
//         let records = await Record.find().limit(10000)

//         for (let rec of records) {
//             if (rec.fullName == null || rec.fullName == '' || rec.fullName == undefined) {
//                 rec.fullName = rec.firstName + ' ' + rec.lastName
//                 await rec.save();
//             }
//             console.log(rec.fullName)
//         }

//         res.send('done')
//     } catch (error) {
//         console.log(error)

//     }
// })

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
app.timeout = 3000000;
