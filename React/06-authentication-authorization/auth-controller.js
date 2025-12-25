// Code was generated using AI assistance

const { hashPassword, verifyPassword } = require('./password-hashing');
const { generateUserToken } = require('./jwt-utils');
const { query } = require('../04-postgresql-database/db-connection');

// ============================================
// User Registration
// ============================================

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }
    
    // Hash password
    const passwordHash = await hashPassword(password);
    
    // Create user
    const result = await query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, passwordHash]
    );
    
    const user = result.rows[0];
    
    // Generate token
    const token = generateUserToken(user);
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
}

// ============================================
// User Login
// ============================================

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Find user
    const result = await query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    const user = result.rows[0];
    
    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateUserToken(user);
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
}

// ============================================
// Get Current User
// ============================================

async function getCurrentUser(req, res, next) {
  try {
    // User is attached to request by auth middleware
    const userId = req.user.userId;
    
    const result = await query(
      'SELECT id, email, created_at FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

// ============================================
// Logout (client-side token removal)
// ============================================

function logout(req, res) {
  // JWT is stateless, so logout is handled client-side
  // by removing the token from storage
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
}

module.exports = {
  register,
  login,
  getCurrentUser,
  logout
};

