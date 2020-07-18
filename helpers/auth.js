const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async function(req,res){
  try {
    // Check if user exists
    const user = await db.User.findOne({username: req.body.username});
    if(!user) return res.json({error: 'Invalid username or password'});

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.json({error: 'Invalid username or password'});
    // if(!validPass) return res.status(400).json({message: 'Invalid password'});

    // Create token and assign token
    const token = jwt.sign({
        _id: user._id, 
        username: user.username, 
        accountType: user.accountType
      }, 
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1m'
      });
    res.header('auth-token', token).json({
      token,
      user: {
        _id: user._id,
        accountType: user.accountType,
        username: user.username,
        fullName: user.fullName
      }
    });
  } catch (err) {
    console.log(err);
  } 
}

exports.tokenIsValid = async function(req,res){
  // try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await db.User.findById(verified._id);
    if (!user) return res.json(false);

    return res.json(true);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
}
