// Code was generated using AI assistance

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('./controllers-example');

// ============================================
// User Routes
// ============================================

// GET /api/users - Get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Get user by ID
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users - Create user
router.post('/users', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    const user = await createUser(email, password);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
    }
    next(error);
  }
});

// PUT /api/users/:id - Update user
router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// ============================================
// Profile Routes
// ============================================

// GET /api/profiles/:userId
router.get('/profiles/:userId', async (req, res, next) => {
  try {
    // Implementation here
    res.json({ message: 'Get profile' });
  } catch (error) {
    next(error);
  }
});

// POST /api/profiles
router.post('/profiles', async (req, res, next) => {
  try {
    // Implementation here
    res.status(201).json({ message: 'Create profile' });
  } catch (error) {
    next(error);
  }
});

// PUT /api/profiles/:userId
router.put('/profiles/:userId', async (req, res, next) => {
  try {
    // Implementation here
    res.json({ message: 'Update profile' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

