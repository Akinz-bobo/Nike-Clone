const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../util/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    DOB,
    photo,
    username,
    sex,
  } = req.body;

  // create user
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    passwordConfirm,
    photo,
    DOB,
    sex,
  });
  //sign the created user in
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'seccess',
    token,
    user: newUser,
  });
});
