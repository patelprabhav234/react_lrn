// Code was generated using AI assistance

const { query } = require('./db-connection');

// ============================================
// SELECT Queries
// ============================================

// Get all users
async function getAllUsers() {
  const result = await query('SELECT * FROM users');
  return result.rows;
}

// Get user by ID
async function getUserById(userId) {
  const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}

// Get user by email
async function getUserByEmail(email) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

// Get user with profile (JOIN)
async function getUserWithProfile(userId) {
  const result = await query(`
    SELECT 
      u.id,
      u.email,
      u.created_at,
      p.name,
      p.phone,
      p.address,
      p.bio
    FROM users u
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE u.id = $1
  `, [userId]);
  return result.rows[0];
}

// ============================================
// INSERT Queries
// ============================================

// Create user
async function createUser(email, passwordHash) {
  const result = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
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

// ============================================
// UPDATE Queries
// ============================================

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
  
  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(userId);
  
  const result = await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
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
// DELETE Queries
// ============================================

// Delete user (cascade deletes profile and resumes)
async function deleteUser(userId) {
  const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
  return result.rows[0];
}

// Delete resume
async function deleteResume(resumeId) {
  const result = await query('DELETE FROM resumes WHERE id = $1 RETURNING *', [resumeId]);
  return result.rows[0];
}

// ============================================
// Complex Queries
// ============================================

// Get user's resumes with screening results
async function getUserResumesWithScreening(userId) {
  const result = await query(`
    SELECT 
      r.id,
      r.filename,
      r.uploaded_at,
      sr.match_score,
      sr.screened_at
    FROM resumes r
    LEFT JOIN screening_results sr ON r.id = sr.resume_id
    WHERE r.user_id = $1
    ORDER BY r.uploaded_at DESC
  `, [userId]);
  return result.rows;
}

// Search profiles
async function searchProfiles(searchTerm) {
  const result = await query(`
    SELECT 
      p.*,
      u.email
    FROM profiles p
    JOIN users u ON p.user_id = u.id
    WHERE 
      p.name ILIKE $1 OR
      p.bio ILIKE $1 OR
      u.email ILIKE $1
    ORDER BY p.updated_at DESC
  `, [`%${searchTerm}%`]);
  return result.rows;
}

// ============================================
// Aggregate Queries
// ============================================

// Get statistics
async function getStatistics() {
  const result = await query(`
    SELECT 
      (SELECT COUNT(*) FROM users) as total_users,
      (SELECT COUNT(*) FROM profiles) as total_profiles,
      (SELECT COUNT(*) FROM resumes) as total_resumes,
      (SELECT COUNT(*) FROM screening_results) as total_screenings,
      (SELECT AVG(match_score) FROM screening_results) as avg_match_score
  `);
  return result.rows[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserWithProfile,
  createUser,
  createProfile,
  updateUser,
  updateProfile,
  deleteUser,
  deleteResume,
  getUserResumesWithScreening,
  searchProfiles,
  getStatistics
};

