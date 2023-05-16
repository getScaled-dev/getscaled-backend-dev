const express = require('express')
const multer = require('multer');
const path = require('path')
// const auth = require('./helpers/index');
const recordController = require('../controller/recordController')
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



router.post('/api/add-data', upload.single('csvFile'), recordController.addData);

// GET API with pagination and filters
router.get('/api/dashboard', recordController.dashboard);

router.put('/update-data', recordController.updateData);

router.delete('/delete-records', recordController.deleteRecords);

module.exports = router;