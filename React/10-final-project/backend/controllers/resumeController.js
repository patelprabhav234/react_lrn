// Code was generated using AI assistance

const { query } = require('../utils/db');
const fs = require('fs').promises;

async function getResumes(req, res, next) {
  try {
    const userId = req.user.userId;
    const result = await query(
      'SELECT * FROM resumes WHERE user_id = $1 ORDER BY uploaded_at DESC',
      [userId]
    );
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}

async function uploadResume(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }
    
    const userId = req.user.userId;
    const { filename, path: filePath, size, mimetype } = req.file;
    
    const result = await query(
      `INSERT INTO resumes (user_id, filename, file_path, file_size, mime_type) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [userId, filename, filePath, size, mimetype]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

async function getResume(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const result = await query(
      'SELECT * FROM resumes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
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

async function deleteResume(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    // Get resume to delete file
    const resumeResult = await query(
      'SELECT file_path FROM resumes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (resumeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }
    
    // Delete file
    try {
      await fs.unlink(resumeResult.rows[0].file_path);
    } catch (err) {
      console.error('Error deleting file:', err);
    }
    
    // Delete from database
    await query('DELETE FROM resumes WHERE id = $1', [id]);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getResumes, uploadResume, getResume, deleteResume };

