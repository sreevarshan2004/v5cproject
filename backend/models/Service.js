const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  title: String,
  image: String, // Base64 string
}, { timestamps: true });
module.exports = mongoose.model('Service', serviceSchema);