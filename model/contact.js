const mongoose = require('mongoose');
const { type } = require('os');



const contactSchema = mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    message: {
        type:String,
        required: true
    }

});

const contactModel = mongoose.model('contact', contactSchema)

module.exports = contactModel;