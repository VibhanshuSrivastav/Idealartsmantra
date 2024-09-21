require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
const conn = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' } // Add write concern configuration
})
.then(() => console.log("connected successfully.."))
.catch((err) => console.log(err));

module.exports = conn;
