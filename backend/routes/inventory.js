const express = require('express');
const Inventory = require('../models/Inventory');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get expiring ingredients alerts
router.get('/alerts', authMiddleware, async (req, res) => {
  const today = new Date();
  const soon = new Date(today.setDate(today.getDate() + 3)); // Alert for next 3 days
  const alerts = await Inventory.find({ expiryDate: { $lte: soon } });
  res.json(alerts);
});

module.exports = router;
