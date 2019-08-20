const jwt = require('jsonwebtoken');
//const config = require('config');
const keys=require('../config/keys')

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  //Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, keys.secretOrKey);
    req.user = decoded.user;//{ id: '5d2daaa0ceedf01e5c704d37' }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
