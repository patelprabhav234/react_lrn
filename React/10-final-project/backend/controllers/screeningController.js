// Code was generated using AI assistance

const { query } = require('../utils/db');
const { MasterScreeningAgent } = require('../../09-ai-integration-resume-screening/screening-agent');
const fs = require('fs').promises;

const masterAgent = new MasterScreeningAgent();

async function screenResume(req, res, next) {
  try {
    const { resumeId, jobRequirements } = req.body;
    const userId = req.user.userId;
    
    if (!resumeId || !jobRequirements) {
      return res.status(400).json({
        success: false,
        error: 'Resume ID and job requirements are required'
      });
    }
    
    // Get resume
    const resumeResult = await query(
      'SELECT * FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, userId]
    );
    
    if (resumeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }
    
    const resume = resumeResult.rows[0];
    
    // Read resume file (assuming text extraction is done)
    // For production, use a PDF parser library
    let resumeText = '';
    try {
      resumeText = await fs.readFile(resume.file_path, 'utf8');
    } catch (err) {
      // If binary file, use placeholder
      resumeText = `Resume: ${resume.filename}`;
    }
    
    // Screen resume using AI agent
    const screeningResult = await masterAgent.processResume(resumeText, jobRequirements);
    
    // Save screening results
    const insertResult = await query(
      `INSERT INTO screening_results 
       (resume_id, job_requirements, match_score, skills_extracted, 
        experience_summary, recommendations, screening_data) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        resumeId,
        jobRequirements,
        screeningResult.score,
        screeningResult.resume.skills || [],
        screeningResult.screening.experienceMatch || '',
        JSON.stringify(screeningResult.screening.recommendations || []),
        JSON.stringify(screeningResult)
      ]
    );
    
    res.json({
      success: true,
      data: {
        screening: insertResult.rows[0],
        result: screeningResult
      }
    });
  } catch (error) {
    console.error('Screening error:', error);
    next(error);
  }
}

async function getScreeningResults(req, res, next) {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;
    
    // Verify resume belongs to user
    const resumeResult = await query(
      'SELECT id FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, userId]
    );
    
    if (resumeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }
    
    // Get screening results
    const result = await query(
      'SELECT * FROM screening_results WHERE resume_id = $1 ORDER BY screened_at DESC',
      [resumeId]
    );
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { screenResume, getScreeningResults };

