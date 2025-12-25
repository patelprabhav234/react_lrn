// Code was generated using AI assistance

const express = require('express');
const app = express();

// ============================================
// Built-in Middleware
// ============================================

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
// app.use(express.static('public'));

// ============================================
// Custom Middleware
// ============================================

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

app.use(logger);

// Request time middleware
const requestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

app.use(requestTime);

// ============================================
// Route-specific Middleware
// ============================================

// Authentication middleware (example)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // In real app, verify token
  req.user = { id: 1, name: 'John Doe' };
  next();
};

// Apply to specific route
app.get('/api/profile', authenticate, (req, res) => {
  res.json({
    message: 'Protected route',
    user: req.user
  });
});

// ============================================
// Error Handling Middleware
// ============================================

// Must be defined last, after all routes
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ============================================
// Async Error Handler
// ============================================

// Wrapper for async route handlers
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
app.get('/api/data', asyncHandler(async (req, res) => {
  // Async operations
  const data = await fetchData();
  res.json(data);
}));

// ============================================
// CORS Middleware (if needed)
// ============================================

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

app.use(cors);

// ============================================
// Body Validation Middleware
// ============================================

const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }
  
  next();
};

app.post('/api/users', validateUser, (req, res) => {
  res.json({ message: 'User created', user: req.body });
});

module.exports = app;

