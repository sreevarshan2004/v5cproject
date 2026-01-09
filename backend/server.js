const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Models
const Property = require('./models/Property');
const Service = require('./models/Service');
const Partner = require('./models/Partner');
const Emirate = require('./models/Emirate');
const WhyDubai = require('./models/WhyDubai');

const app = express();

// Middleware (Increased limit for images)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// --- GENERIC CRUD HELPER FUNCTION ---
const createCrud = (app, route, Model) => {
  // GET ALL
  app.get(`/api/${route}`, async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // POST (ADD)
  app.post(`/api/${route}`, async (req, res) => {
    try {
      const newItem = new Model(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) { res.status(400).json({ error: err.message }); }
  });

  // DELETE
  app.delete(`/api/${route}/:id`, async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });
  
  // UPDATE (PUT)
  app.put(`/api/${route}/:id`, async (req, res) => {
      try {
          const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.json(updatedItem);
      } catch (err) { res.status(500).json({ error: err.message }); }
  });
};

// --- REGISTER ROUTES ---
createCrud(app, 'properties', Property);
createCrud(app, 'services', Service);
createCrud(app, 'partners', Partner);
createCrud(app, 'emirates', Emirate);
createCrud(app, 'whydubai', WhyDubai);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('API is Running Successfully!');
});
module.exports = app;