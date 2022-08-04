const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  DOB: {
    type: Date,
    default: Date.now(),
    required: [true, 'Please provide your date of birth'],
    validate: [validator.isDate],
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
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password and passwordConfirm are not the same',
    },
  },
  sex: {
    type: String,
    required: [true, 'Please specify your sex'],
    enum: ['male', 'female', 'complicated'],
    default: 'complicated',
  },
});
console.log('Hi');
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
console.log('How far');
const User = mongoose.model('User', userSchema);
module.exports = User;
