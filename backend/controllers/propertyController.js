const Property = require('../models/Property');

// @desc    Get all properties
// @route   GET /api/properties
const getProperties = async (req, res) => {
  try {
    // Sort by createdAt -1 means show newest properties first
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new property
// @route   POST /api/properties
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProperties, createProperty };