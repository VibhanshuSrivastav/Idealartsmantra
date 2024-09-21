const mongoose = require('mongoose');
const { type } = require('os');



const topperSchema = mongoose.Schema({

    topperImg: {
        type: String,
        required: true
    },
    topperName: {
        type: String,
        required: true
    },
    topperClass: {
        type: String,
        required: true
    },
    topperGrade: {
        type:String,
        required: true
    }

});

const topperModel = mongoose.model('topper', topperSchema)

module.exports = topperModel;