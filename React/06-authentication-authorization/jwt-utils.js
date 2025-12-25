// Code was generated using AI assistance

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// ============================================
// Generate JWT Token
// ============================================

function generateToken(payload, expiresIn = JWT_EXPIRES_IN) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Generate token for user
function generateUserToken(user) {
  const payload = {
    userId: user.id,
    email: user.email
  };
  return generateToken(payload);
}

// ============================================
// Verify JWT Token
// ============================================

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, error: 'Token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { valid: false, error: 'Invalid token' };
    }
    return { valid: false, error: error.message };
  }
}

// ============================================
// Decode Token (without verification)
// ============================================

function decodeToken(token) {
  return jwt.decode(token);
}

// ============================================
// Extract Token from Request
// ============================================

function extractTokenFromRequest(req) {
  // Check Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Check query parameter
  if (req.query.token) {
    return req.query.token;
  }
  
  return null;
}

// ============================================
// Example Usage
// ============================================

function example() {
  const user = {
    id: 1,
    email: 'user@example.com'
  };
  
  // Generate token
  const token = generateUserToken(user);
  console.log('Generated token:', token);
  
  // Verify token
  const result = verifyToken(token);
  if (result.valid) {
    console.log('Token payload:', result.payload);
  } else {
    console.log('Token error:', result.error);
  }
  
  // Decode without verification
  const decoded = decodeToken(token);
  console.log('Decoded token:', decoded);
}

// ============================================
// Token Refresh
// ============================================

function refreshToken(oldToken) {
  const decoded = decodeToken(oldToken);
  if (!decoded) {
    throw new Error('Invalid token');
  }
  
  // Generate new token with same payload
  return generateToken({
    userId: decoded.userId,
    email: decoded.email
  });
}

module.exports = {
  generateToken,
  generateUserToken,
  verifyToken,
  decodeToken,
  extractTokenFromRequest,
  refreshToken
};

// Run example if executed directly
if (require.main === module) {
  example();
}

