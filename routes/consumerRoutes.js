const express = require('express')
const multer = require('multer');
const path = require('path')
// const auth = require('./helpers/index');
const consumerController = require('../controller/consumerController')
const router = new express.Router();

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



router.post('/api/add-consumer-data', upload.single('csvFile'), consumerController.addData);

// GET API with pagination and filters
router.get('/api/get-consumer-data', consumerController.getConsumerData);

router.put('/update-consumer-data', consumerController.updateData);

router.delete('/delete-consumer-records', consumerController.deleteRecords);

module.exports = router;