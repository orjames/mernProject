const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  colorRec: Object,
  cloudColors: Array,
  publicId: String,
  date: Date,
});

module.exports = mongoose.model('Upload', uploadSchema);
