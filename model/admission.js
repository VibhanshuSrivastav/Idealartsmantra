const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { getNextSequenceValue } = require('../db/sequence');

const studentSchema = new mongoose.Schema({
    rollNo: { type: Number, unique: true },
    sImage: { type: String, required: true },
    sName: { type: String, required: true },
    fName: { type: String, required: true },
    mName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    aadhar: { type: Number, required: true },
    subject: { type: [String], required: true },
    class: { type: String, required: true },
    englishNotesEnabled: { type: Boolean, default: false },
    sstNotesEnabled: { type: Boolean, default: false },
    politicalNotesEnabled: { type: Boolean, default: false },
    historyNotesEnabled: { type: Boolean, default: false },
    geographyNotesEnabled: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // New field for user role
});

// Pre-save hook to hash the password
studentSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        if (!this.rollNo) {
            this.rollNo = await getNextSequenceValue('studentId');
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function(plaintext) {
    return await bcrypt.compare(plaintext, this.password);
};

// Virtual field to get book links based on subjects
studentSchema.virtual('bookLinks').get(function() {
    const links = {};
    this.subject.forEach(sub => {
        links[sub] = `/book/${this.class}/${sub.toLowerCase()}`;
    });
    return links;
});

const admissionModel = mongoose.model('Student', studentSchema);

module.exports = admissionModel;
