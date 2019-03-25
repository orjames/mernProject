const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  ring: Boolean,
  age: Number,
  form: String,
});

module.exports = mongoose.model('Upload', uploadSchema);
