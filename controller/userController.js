const User = require('../models/userModel');
const appError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new appError(
        `No User with the specified id: ${id} found on this server`,
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    user: newUser,
  });
});
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
