const express = require('express');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const app = express();
app.use(express.json());
// 3) ROUTES
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
