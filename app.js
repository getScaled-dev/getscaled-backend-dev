require('dotenv').config()
require('./db/connention')
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
// Set up the Express app
const app = express();

const port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', require('./controller/auth'));

// const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');

// app.use(userRoutes);
app.use(recordRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
app.timeout = 3000000;
