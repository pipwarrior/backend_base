const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.header('auth-token');
  
  if(!token) return res.status(401).json({message: 'Please login to access this page.'});

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    // Token not verified
    if(!verified) return res.status(401).json({message: 'Please login to access this page.'});

    // Token verified
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).json({message: err.message});
  }
}
