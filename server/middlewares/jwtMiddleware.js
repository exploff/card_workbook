const jwtUtils = require('../utils/jwtUtils');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({ auth: false, message: 'No token' });
  } else {
    const decodedToken = jwtUtils.verifyAccessToken(token);
    if (!decodedToken) {
      res.status(403).json({ auth: false, message: 'Failed to authenticate' });
    } else {
      req.userId = decodedToken.id;
      next();
    }
  }
};

module.exports = verifyJWT;
