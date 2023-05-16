const express = require('express')

// const auth = require('./helpers/index');
const multer = require('multer')
const path = require('path')
const userController = require('../controller/userController')
const router = new express.Router();


// const { EventEmitter } = require("events");
// const { log } = require("console");
// const myEmitter = new EventEmitter();
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         console.log(file, 'filedddd')
//         // console.log(__dirname);
//         callBack(null, "../uploads");
//     },
//     filename: (req, file, callBack) => {
//         callBack(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });

const upload = multer({ dest: 'uploads/' });


router.post('/upload-csv', upload.single('file'), userController.importCSV)


module.exports = router;

