const db = require('../models');
const bcrypt = require('bcryptjs');

exports.createUser = async function(req,res){
  // Check if username is unique
  const usernameExist = await db.User.findOne({username: req.body.username});
  if(usernameExist) return res.status(400).json({message: 'Username exists'});

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the new user
  const user = {
    username: req.body.username,
    password: hashedPassword,
    accountType: req.body.accountType,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber
  }

  db.User.create(user)
  .then(function(newUser){
    res.status(201).json(newUser);
  })
  .catch(function(err){
    res.send(err.message);
  })
}

exports.getUser = async (req,res) => {
  const user = await db.User.findById(req.user);
  res.json({
    _id: user._id,
    accountType: user.accountType,
    username: user.username,
    fullName: user.fullName
  });
}

exports.deleteUser = async (req,res) => {
  const deletedUser = await db.User.findByIdAndDelete(req.user);
  res.json(deletedUser);
}
