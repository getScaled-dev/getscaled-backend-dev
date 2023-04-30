var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://justin_gs:DfJmyFpwbDjXDkqK@cluster0.rnqyxyv.mongodb.net/usersData", { useNewUrlParser: true })
    .then((res) => {
        console.log('dB is connected')
    })
    .catch((err) => {
        console.log('db is not connecting', err)
    })