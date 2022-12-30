const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

module.exports = connection

