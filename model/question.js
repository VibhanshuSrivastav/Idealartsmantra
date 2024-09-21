const mongoose = require('mongoose');

const questionSchema =  mongoose.Schema({
  class: { type: String, required: true }, // e.g., "Class 10"
  subject: { type: String, required: true }, // e.g., "English"
  question: { type: String, required: true },
  options: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true }
  },
  correctOption: { type: String, required: true } // e.g., "a"
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question