const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessJWTSecret = process.env.ACCESS_TOKEN_SECRET || 'secret_access_token';
const refreshJWTSecret = process.env.REFRESH_TOKEN_SECRET || 'secret_refresh_token';

// Fonction pour générer un access token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, accessJWTSecret, { expiresIn: '15m' });
};

// Fonction pour vérifier un access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, accessJWTSecret);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
