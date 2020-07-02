const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.header('auth-token');
  const decoded = jwt.decode(token);

  if(!token) return res.status(401).json({message: 'Please login to access this page.'});

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    // Token not verified
    if(!verified) return res.status(401).json({message: 'Please login to access this page.'});

    // Token is not admin
    if(decoded.accountType !== 'Admin') return res.status(401).json({message: 'Authorisation failed.'});

    // Token verified
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).json({message: err.message});
  }
}
