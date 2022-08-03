const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'A user must have a first name'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'A user must have a last name'],
    trim: true,
  },
  username: {
    type: String,
    default: `${this.firstname} ${this.lastname}`,
    trim: true,
    unique: [true, 'The username is taken'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  DOB: {
    type: Date,
    default: Date.now(),
    required: [true, 'Please provide your date of birth'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
    trim: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
