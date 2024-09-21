const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchNumber: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

const batch = mongoose.model('batch', batchSchema);

module.exports = batch;
