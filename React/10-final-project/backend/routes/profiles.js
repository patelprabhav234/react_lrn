// Code was generated using AI assistance

const express = require('express');
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');
const { authenticate, authorizeOwnerOrAdmin } = require('../middleware/auth');

router.get('/:userId', authenticate, getProfile);
router.post('/', authenticate, createProfile);
router.put('/:userId', authenticate, authorizeOwnerOrAdmin, updateProfile);
router.delete('/:userId', authenticate, authorizeOwnerOrAdmin, deleteProfile);

module.exports = router;

