var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb://127.0.0.1:27017/usersData", { useNewUrlParser: true })
    .then((res) => {
        console.log('dB is connected')
    })
    .catch((err) => {
        console.log('db is not connecting', err)
    })