// Code was generated using AI assistance

const { query } = require('../04-postgresql-database/db-connection');

// ============================================
// User Controllers
// ============================================

// Get all users
async function getAllUsers() {
  const result = await query('SELECT id, email, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
}

// Get user by ID
async function getUserById(userId) {
  const result = await query('SELECT id, email, created_at FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}

// Create user
async function createUser(email, passwordHash) {
  const result = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, passwordHash]
  );
  return result.rows[0];
}

// Update user
async function updateUser(userId, updates) {
  const fields = [];
  const values = [];
  let paramCount = 1;
  
  if (updates.email) {
    fields.push(`email = $${paramCount++}`);
    values.push(updates.email);
  }
  
  if (updates.password_hash) {
    fields.push(`password_hash = $${paramCount++}`);
    values.push(updates.password_hash);
  }
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(userId);
  
  const result = await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING id, email, updated_at`,
    values
  );
  return result.rows[0];
}

// Delete user
async function deleteUser(userId) {
  const result = await query('DELETE FROM users WHERE id = $1 RETURNING id, email', [userId]);
  return result.rows[0];
}

// ============================================
// Profile Controllers
// ============================================

// Get profile by user ID
async function getProfileByUserId(userId) {
  const result = await query(
    'SELECT * FROM profiles WHERE user_id = $1',
    [userId]
  );
  return result.rows[0];
}

// Create profile
async function createProfile(userId, profileData) {
  const { name, phone, address, bio } = profileData;
  const result = await query(
    `INSERT INTO profiles (user_id, name, phone, address, bio) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [userId, name, phone, address, bio]
  );
  return result.rows[0];
}

// Update profile
async function updateProfile(userId, profileData) {
  const { name, phone, address, bio } = profileData;
  const result = await query(
    `UPDATE profiles 
     SET name = $1, phone = $2, address = $3, bio = $4, updated_at = CURRENT_TIMESTAMP 
     WHERE user_id = $5 
     RETURNING *`,
    [name, phone, address, bio, userId]
  );
  return result.rows[0];
}

// ============================================
// Resume Controllers
// ============================================

// Get user's resumes
async function getUserResumes(userId) {
  const result = await query(
    'SELECT * FROM resumes WHERE user_id = $1 ORDER BY uploaded_at DESC',
    [userId]
  );
  return result.rows;
}

// Create resume record
async function createResume(userId, resumeData) {
  const { filename, file_path, file_size, mime_type } = resumeData;
  const result = await query(
    `INSERT INTO resumes (user_id, filename, file_path, file_size, mime_type) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [userId, filename, file_path, file_size, mime_type]
  );
  return result.rows[0];
}

// Delete resume
async function deleteResume(resumeId) {
  const result = await query('DELETE FROM resumes WHERE id = $1 RETURNING *', [resumeId]);
  return result.rows[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfileByUserId,
  createProfile,
  updateProfile,
  getUserResumes,
  createResume,
  deleteResume
};

