const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION, closing the server...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('Db connection is sucessful!');
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`server listening  on port ${port}...`)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION, closing the server...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
