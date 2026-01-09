const mongoose = require('mongoose');
const emirateSchema = new mongoose.Schema({
  name: String,
  desc: String,
}, { timestamps: true });
module.exports = mongoose.model('Emirate', emirateSchema);