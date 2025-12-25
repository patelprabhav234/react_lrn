// Code was generated using AI assistance

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getResumes,
  uploadResume,
  getResume,
  deleteResume
} = require('../controllers/resumeController');
const { authenticate } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX allowed.'));
    }
  }
});

router.get('/', authenticate, getResumes);
router.post('/', authenticate, upload.single('resume'), uploadResume);
router.get('/:id', authenticate, getResume);
router.delete('/:id', authenticate, deleteResume);

module.exports = router;

