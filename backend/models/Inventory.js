const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  ingredient: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date },
});

module.exports = mongoose.model('Inventory', InventorySchema);
