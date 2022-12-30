const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

module.exports = connection

