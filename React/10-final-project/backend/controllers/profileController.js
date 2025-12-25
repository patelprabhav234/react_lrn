// Code was generated using AI assistance

const { query } = require('../utils/db');

async function getProfile(req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await query(
      `SELECT p.*, u.email 
       FROM profiles p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.user_id = $1`,
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
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

async function createProfile(req, res, next) {
  try {
    const userId = req.user.userId;
    const { name, phone, address, bio } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }
    
    const result = await query(
      `INSERT INTO profiles (user_id, name, phone, address, bio) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [userId, name, phone, address, bio]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        error: 'Profile already exists'
      });
    }
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const userId = req.params.userId;
    const { name, phone, address, bio } = req.body;
    
    const result = await query(
      `UPDATE profiles 
       SET name = $1, phone = $2, address = $3, bio = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $5 
       RETURNING *`,
      [name, phone, address, bio, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
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

async function deleteProfile(req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await query(
      'DELETE FROM profiles WHERE user_id = $1 RETURNING *',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getProfile, createProfile, updateProfile, deleteProfile };

