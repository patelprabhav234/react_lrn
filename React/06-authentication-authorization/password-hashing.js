// Code was generated using AI assistance

const bcrypt = require('bcrypt');

// ============================================
// Password Hashing
// ============================================

// Hash password (async)
async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Hash password (sync - not recommended for production)
function hashPasswordSync(password) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

// ============================================
// Password Verification
// ============================================

// Verify password (async)
async function verifyPassword(password, hash) {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

// Verify password (sync)
function verifyPasswordSync(password, hash) {
  return bcrypt.compareSync(password, hash);
}

// ============================================
// Example Usage
// ============================================

async function example() {
  const plainPassword = 'mySecurePassword123';
  
  // Hash password
  const hashedPassword = await hashPassword(plainPassword);
  console.log('Hashed password:', hashedPassword);
  
  // Verify password
  const isValid = await verifyPassword(plainPassword, hashedPassword);
  console.log('Password valid:', isValid);
  
  // Wrong password
  const isInvalid = await verifyPassword('wrongPassword', hashedPassword);
  console.log('Wrong password valid:', isInvalid);
}

// ============================================
// Password Strength Validation
// ============================================

function validatePasswordStrength(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================
// Export
// ============================================

module.exports = {
  hashPassword,
  hashPasswordSync,
  verifyPassword,
  verifyPasswordSync,
  validatePasswordStrength
};

// Run example if executed directly
if (require.main === module) {
  example().catch(console.error);
}

