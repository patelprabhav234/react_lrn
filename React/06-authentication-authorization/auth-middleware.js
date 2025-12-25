// Code was generated using AI assistance

const { verifyToken, extractTokenFromRequest } = require('./jwt-utils');

// ============================================
// Authentication Middleware
// ============================================

function authenticate(req, res, next) {
  // Extract token from request
  const token = extractTokenFromRequest(req);
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided. Authentication required.'
    });
  }
  
  // Verify token
  const result = verifyToken(token);
  
  if (!result.valid) {
    return res.status(401).json({
      success: false,
      error: result.error || 'Invalid or expired token'
    });
  }
  
  // Attach user info to request
  req.user = result.payload;
  next();
}

// ============================================
// Optional Authentication Middleware
// ============================================

// Use this when authentication is optional (e.g., public routes with optional user context)
function optionalAuthenticate(req, res, next) {
  const token = extractTokenFromRequest(req);
  
  if (token) {
    const result = verifyToken(token);
    if (result.valid) {
      req.user = result.payload;
    }
  }
  
  next();
}

// ============================================
// Role-based Authorization
// ============================================

function authorize(...allowedRoles) {
  return (req, res, next) => {
    // First check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    // Check if user has required role
    // Note: You'll need to add role to your user model
    const userRole = req.user.role || 'user';
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }
    
    next();
  };
}

// ============================================
// Owner or Admin Authorization
// ============================================

// Check if user owns the resource or is an admin
function authorizeOwnerOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
  
  const userId = req.user.userId;
  const resourceUserId = req.params.userId || req.body.userId;
  const isAdmin = req.user.role === 'admin';
  const isOwner = userId === parseInt(resourceUserId);
  
  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'You can only access your own resources'
    });
  }
  
  next();
}

// ============================================
// Usage Examples
// ============================================

/*
// Protect a route
app.get('/api/profile', authenticate, getProfile);

// Optional authentication
app.get('/api/posts', optionalAuthenticate, getPosts);

// Role-based authorization
app.delete('/api/users/:id', authenticate, authorize('admin'), deleteUser);

// Owner or admin
app.put('/api/profiles/:userId', authenticate, authorizeOwnerOrAdmin, updateProfile);
*/

module.exports = {
  authenticate,
  optionalAuthenticate,
  authorize,
  authorizeOwnerOrAdmin
};

