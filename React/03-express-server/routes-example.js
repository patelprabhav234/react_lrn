// Code was generated using AI assistance

const express = require('express');
const router = express.Router();

// ============================================
// Basic Routes
// ============================================

// GET - Retrieve resources
router.get('/users', (req, res) => {
  res.json({
    message: 'Get all users',
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]
  });
});

// POST - Create resources
router.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  // In real app, save to database
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    message: 'User created',
    user: newUser
  });
});

// PUT - Update resources
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  res.json({
    message: `Update user ${id}`,
    user: { id, name, email }
  });
});

// DELETE - Delete resources
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    message: `Delete user ${id}`
  });
});

// ============================================
// Route Parameters
// ============================================

// Single parameter
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Get user ${id}`,
    userId: id
  });
});

// Multiple parameters
router.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({
    userId,
    postId
  });
});

// ============================================
// Query Parameters
// ============================================

router.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  res.json({
    query: q,
    page: parseInt(page),
    limit: parseInt(limit),
    results: []
  });
});

// Example: GET /search?q=javascript&page=2&limit=20

// ============================================
// Request Body
// ============================================

router.post('/profiles', (req, res) => {
  const { name, email, phone, address } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }
  
  res.status(201).json({
    message: 'Profile created',
    profile: { name, email, phone, address }
  });
});

// ============================================
// Route Chaining
// ============================================

router.route('/resumes/:id')
  .get((req, res) => {
    res.json({ message: `Get resume ${req.params.id}` });
  })
  .put((req, res) => {
    res.json({ message: `Update resume ${req.params.id}` });
  })
  .delete((req, res) => {
    res.json({ message: `Delete resume ${req.params.id}` });
  });

module.exports = router;

