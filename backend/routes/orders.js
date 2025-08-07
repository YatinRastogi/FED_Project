const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth'); // For protected routes

const router = express.Router();

// Create new order (from customer)
router.post('/', async (req, res) => {
  const { tableNumber, items } = req.body;
  try {
    const newOrder = new Order({ tableNumber, items });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get pending orders (protected for chef)
router.get('/pending', authMiddleware, async (req, res) => {
  const orders = await Order.find({ status: 'pending' }).sort({ createdAt: -1 });
  res.json(orders);
});

// Update order status (protected)
router.put('/:id/update', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status, updatedAt: Date.now() }, { new: true });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
