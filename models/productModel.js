const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true,
  },
  category: {
    // type of shoe, e.g brogues...
    type: String,
    requires: [true, 'A product mus have a category'],
  },
  section: {
    // section, e.g male, female ...
    type: String,
    required: [
      true,
      'Please specify the section to which the product belong i.male,female,children',
    ],
  },
  amount: {
    type: Number,
    required: [true, 'Please specify the number of product'],
  },
  sizes: {
    type: [Number],
    required: [true, 'Please specify the size/sizes of the product'],
  },
  color: String,
  reviews: {
    type: [String],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A product must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
