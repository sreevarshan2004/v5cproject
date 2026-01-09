const mongoose = require('mongoose');
const partnerSchema = new mongoose.Schema({
  name: String,
  logo: String, // Base64 string
}, { timestamps: true });
module.exports = mongoose.model('Partner', partnerSchema);