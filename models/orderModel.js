const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'An order must have owner'],
  },
  email: {
    type: String,
    required: true,
  },
  products: [String],
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
