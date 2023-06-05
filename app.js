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
const LinkedinData2 = require('./routes/linkedin2Routes');

const consumerRoutes = require('./routes/consumerRoutes')
const mauticRoutes = require('./routes/mauticRoutes')

// app.use(userRoutes);
app.use(recordRoutes);
app.use(LinkedinData2);
app.use(mauticRoutes);
app.use(consumerRoutes)


// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
});
app.timeout = 3000000;
