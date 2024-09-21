const mongoose = require('mongoose');

const bookSchema =  mongoose.Schema({
  class: { type: String, required: true }, // e.g., "Class 10"
  subject: { type: String, required: true }, // e.g., "English"
  topicHeading: { type: String, required: true },
  topicImg: { type: String, required: true },
  topicExplaination: { type: String, required: true },
});

const book = mongoose.model('book', bookSchema);
module.exports = book ; 