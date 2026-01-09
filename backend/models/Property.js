const mongoose = require('mongoose');
const propertySchema = mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  price: String,
  developer: String,
  category: String,
  beds: String,
  baths: String,
  sqft: String,
  description: String,
  heroImages: [String], // Array of image URLs/Base64
  masterPlanImages: [String],
  nearbyPlaces: [{ name: String, time: String }],
  floorPlans: [{ type: {type: String}, sqft: String, image: String }],
  selectedAmenities: [String],
  visionDesc: String,
  ownerName: String,
  ownerEmail: String,
  ownerPhone: String,
  propertyValue: String,
}, { timestamps: true });
module.exports = mongoose.model('Property', propertySchema);