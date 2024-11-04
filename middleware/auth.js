const jwt = require('jsonwebtoken');

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); 
    req.account = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
