const express = require('express')
// const auth = require('./helpers/index');
const mauticController = require('../controller/mauticController')
const router = new express.Router();






// GET API with pagination and filters
router.get('/api/list-contacts', mauticController.getContacts);

// router.put('/update-data', recordController.updateData);

// router.delete('/delete-records', recordController.deleteRecords);

module.exports = router;