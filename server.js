const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
app.listen(port, () => console.log(`server listening  on port ${port}...`));
