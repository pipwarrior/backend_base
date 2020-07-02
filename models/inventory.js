const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  partNumber: {
    type: Array,
    default: []
  },
  description: {
    type: String
  },
  brand: String,
  category: String,
  createdOn: {
    type: Date,
    default: Date.now()
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
