var User = require('../models/User')
var csv = require('csvtojson')
const fs = require("fs");
const { parse } = require("csv-parse");



// const importCSV = async (req, res) => {
//     try {
//         let userData = []
//         csv()
//             .fromFile(req.file.path)
//             .then(async (response) => {
//                 for (x = 0; x < response.length; x++) {
//                     console.log(x)
//                     userData.push({
//                         email: response[x].Email,


//                     })

//                 }
//                 await User.insertMany(userData)
//             })
//         res.send({ status: 200, success: true, msg: 'runngin' })
//     } catch (error) {
//         res.send({ status: 400, success: false, msg: error.message })
//     }
// }
function uploadCSVAndSaveToMongoDB(filePath) {
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Create a new user object with the data from the CSV row
            const user = new User({
                name: row.name,
                email: row.email,
                phone: row.phone,
                address: row.address
            });

            // Save the user object to MongoDB
            user.save((err) => {
                if (err) console.error(err);
            });
        })
        .on('end', () => {
            console.log(`Finished processing ${filePath}`);
        });
}
uploadCSVAndSaveToMongoDB('../uploads/test_DB.csv');

module.exports = {
    importCSV
}