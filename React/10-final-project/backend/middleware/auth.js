// Code was generated using AI assistance

const { verifyToken, extractTokenFromRequest } = require('../utils/jwt');

function authenticate(req, res, next) {
  const token = extractTokenFromRequest(req);
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }
  
  const result = verifyToken(token);
  
  if (!result.valid) {
    return res.status(401).json({
      success: false,
      error: result.error || 'Invalid token'
    });
  }
  
  req.user = result.payload;
  next();
}

function authorizeOwnerOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
  
  const userId = req.user.userId;
  const resourceUserId = parseInt(req.params.userId);
  const isOwner = userId === resourceUserId;
  
  if (!isOwner) {
    return res.status(403).json({
      success: false,
      error: 'You can only access your own resources'
    });
  }
  
  next();
}

module.exports = { authenticate, authorizeOwnerOrAdmin };

