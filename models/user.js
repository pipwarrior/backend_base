const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 1
  },
  accountType: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number
  },
  dateJoined: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', userSchema);