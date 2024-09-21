const mongoose = require('mongoose');

const notesSchema =  mongoose.Schema({
  class: { type: String, required: true }, // e.g., "Class 10"
  subject: { type: String, required: true }, // e.g., "English"
  notes:{type: String, required: true}
});

const notes = mongoose.model('notes', notesSchema);
module.exports = notes ; 