// Code was generated using AI assistance

const { hashPassword, verifyPassword } = require('../utils/password');
const { generateUserToken } = require('../utils/jwt');
const { query } = require('../utils/db');

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Check if user exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }
    
    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const result = await query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, passwordHash]
    );
    
    const user = result.rows[0];
    const token = generateUserToken(user);
    
    res.status(201).json({
      success: true,
      data: { user, token }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    const result = await query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    const user = result.rows[0];
    const isValid = await verifyPassword(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    const token = generateUserToken(user);
    
    res.json({
      success: true,
      data: {
        user: { id: user.id, email: user.email },
        token
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user.userId;
    const result = await query(
      'SELECT id, email, created_at FROM users WHERE id = $1',
      [userId]
    );
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

function logout(req, res) {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
}

module.exports = { register, login, getCurrentUser, logout };

