const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  items: [{ name: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Order', OrderSchema);
