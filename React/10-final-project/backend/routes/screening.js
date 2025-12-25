// Code was generated using AI assistance

const express = require('express');
const router = express.Router();
const { screenResume, getScreeningResults } = require('../controllers/screeningController');
const { authenticate } = require('../middleware/auth');

router.post('/screen', authenticate, screenResume);
router.get('/results/:resumeId', authenticate, getScreeningResults);

module.exports = router;

