// Code was generated using AI assistance

// ============================================
// Manual Validation
// ============================================

function validateUser(req, res, next) {
  const { email, password } = req.body;
  const errors = [];
  
  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }
  
  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  next();
}

// ============================================
// Using express-validator
// ============================================

// Install: npm install express-validator

const { body, validationResult, param } = require('express-validator');

// User validation rules
const validateUserCreation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
];

// Profile validation rules
const validateProfile = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Invalid phone number format'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must be less than 500 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio must be less than 1000 characters')
];

// ID parameter validation
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
];

// Validation result handler
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
}

// ============================================
// Usage in Routes
// ============================================

// Example route with validation
/*
app.post('/api/users',
  validateUserCreation,
  handleValidationErrors,
  async (req, res, next) => {
    // Route handler
  }
);

app.put('/api/profiles/:id',
  validateId,
  validateProfile,
  handleValidationErrors,
  async (req, res, next) => {
    // Route handler
  }
);
*/

// ============================================
// Custom Validators
// ============================================

const customValidators = {
  // Check if email already exists
  isEmailUnique: async (email) => {
    // Query database to check if email exists
    // Return true if unique, false otherwise
    return true; // Placeholder
  },
  
  // Check if user exists
  userExists: async (userId) => {
    // Query database to check if user exists
    return true; // Placeholder
  }
};

module.exports = {
  validateUser,
  validateUserCreation,
  validateProfile,
  validateId,
  handleValidationErrors,
  customValidators
};

