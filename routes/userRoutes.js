const express = require('express')

const user = express();

const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')


// user.use(bodyParser.urlencoded({ extended: true }));

// user.use(express.static(path.resolve(__dirname, 'public')));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     },
// })

var uploads = multer({ storage: storage })

const userController = require('../controller/userController')



const { EventEmitter } = require("events");
const { log } = require("console");
const myEmitter = new EventEmitter();
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        console.log(file, 'filedddd')
        // console.log(__dirname);
        callBack(null, "./uploads");
    },
    filename: (req, file, callBack) => {
        callBack(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

var upload = multer({
    storage: storage,
});
user.post('/upload-csv', upload.single('file'), userController.importCSV)

module.exports = user