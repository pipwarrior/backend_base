const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('debug', true);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('CONNECTED TO DB');
}).catch((err) => {
  console.log("ERROR: ", err.message);
})

module.exports.User = require('./user');
module.exports.Inventory = require('./inventory');
