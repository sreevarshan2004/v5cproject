const mongoose = require('mongoose');
const whyDubaiSchema = new mongoose.Schema({
  title: String,
  text: String,
  points: [String],
}, { timestamps: true });
module.exports = mongoose.model('WhyDubai', whyDubaiSchema);