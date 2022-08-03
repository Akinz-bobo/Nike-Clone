const express = require('express');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const appError = require('./util/appError');
const globalErrorHandler = require('./controller/errorController');
const app = express();
app.use(express.json());
// 3) ROUTES
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
