const express = require('express');
const router = express.Router();

// Import Models
const Property = require('../models/Property');
const Service = require('../models/Service');
const Partner = require('../models/Partner'); 
const WhyDubai = require('../models/WhyDubai');
const Emirate = require('../models/Emirate');
const Testimonial = require('../models/Testimonial');


// --- HELPER CRUD FUNCTION ---
const createCrud = (Model) => ({
  // 1. Get ALL
  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) { 
      res.status(500).json({ message: err.message }); 
    }
  },

  // 2. ✅ NEW: Get Single Item By ID (This fixes the 404 error)
  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      // If ID format is wrong (like searching for "1" in MongoDB), return 404
      res.status(404).json({ message: 'Item not found' });
    }
  },

  // 3. Create
  create: async (req, res) => {
    try {
      const newItem = await Model.create(req.body);
      res.status(201).json(newItem);
    } catch (err) { 
      res.status(400).json({ message: err.message }); 
    }
  },

  // 4. Delete
  delete: async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
  }
});


// --- NEW ROUTE: ADD TESTIMONIAL ---
router.post('/testimonials', async (req, res) => {
  try {
    const { name, country, text } = req.body;
    const newTestimonial = new Testimonial({ name, country, text });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- NEW ROUTE: GET ALL TESTIMONIALS ---
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ date: -1 }); // Newest first
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Controllers
const properties = createCrud(Property);
const services = createCrud(Service);
const partners = createCrud(Partner);
const whydubai = createCrud(WhyDubai);
const emirates = createCrud(Emirate);

// --- ROUTES ---

// Properties
router.get('/properties', properties.getAll);
router.get('/properties/:id', properties.getById); // ✅ This line is required!
router.post('/properties', properties.create);
router.delete('/properties/:id', properties.delete);

// Services
router.get('/services', services.getAll);
router.get('/services/:id', services.getById);
router.post('/services', services.create);
router.delete('/services/:id', services.delete);

// Partners
router.get('/partners', partners.getAll);
router.get('/partners/:id', partners.getById);
router.post('/partners', partners.create);
router.delete('/partners/:id', partners.delete);

// Why Dubai
router.get('/whydubai', whydubai.getAll);
router.post('/whydubai', whydubai.create);
router.delete('/whydubai/:id', whydubai.delete);

// Emirates
router.get('/emirates', emirates.getAll);
router.post('/emirates', emirates.create);
router.delete('/emirates/:id', emirates.delete);

module.exports = router;