const mongoose = require('mongoose');
const dateTimeEntrySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
}, { timestamps: true }); 

const DateTimeEntry = mongoose.model('DateTimeEntry', dateTimeEntrySchema);

module.exports = DateTimeEntry;
