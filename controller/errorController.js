const appError = require('../util/appError');
// errors from mongoose  validator
const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new appError(message, 400);
};
// duplicate field errors
const handleDuplicateDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate fields  value: ${value}. Please use another value`;
  return new appError(message, 400);
};
// cast error or invalid _id error
const handlerCastErrorDB = (err) => {
  return new appError(`Invalid ${err.path}: ${err.value}`, 400);
};
//  error for development mode
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
};
// error for production mode
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    console.log('Hey');
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handlerCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDb(error);
    }
    sendErrorProd(err, dev);
  }
};
