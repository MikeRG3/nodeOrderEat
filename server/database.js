const mongoose = require('mongoose');

const URI = 'mongodb://admin:admin175432@ds263295.mlab.com:63295/order_eat';

mongoose.connect(URI, { useCreateIndex: true, useNewUrlParser: true })
    .then(db => console.log("DB is connected"))
    .catch(err => console.log(err));

module.exports = mongoose;