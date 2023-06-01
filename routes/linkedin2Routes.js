const express = require('express')
const multer = require('multer');
const path = require('path')
// const auth = require('./helpers/index');
const linkedin2Controller = require('../controller/linkedin2Controller')
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



router.post('/api/add-linkedin2', upload.single('csvFile'), linkedin2Controller.addData);

// GET API with pagination and filters
router.get('/api/linkedin2', linkedin2Controller.dashboard);

router.put('/update-linkedin2', linkedin2Controller.updateData);

router.delete('/delete-linkedin2', linkedin2Controller.deleteRecords);

module.exports = router;