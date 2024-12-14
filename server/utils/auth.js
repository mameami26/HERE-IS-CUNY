const jwt = require('jsonwebtoken');

const authMiddleware = ({ req }) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { user: decoded };
    } catch (err) {
      console.error('Invalid token');
    }
  }
  return {};
};

module.exports = { authMiddleware };
