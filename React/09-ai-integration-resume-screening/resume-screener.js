// Code was generated using AI assistance

const { chatCompletion, getStructuredOutput } = require('./ai-client');

// ============================================
// Resume Screening
// ============================================

async function screenResume(resumeData, jobRequirements) {
  const schema = {
    matchScore: 'number (0-100)',
    skillsMatch: 'array of matched skills',
    missingSkills: 'array of missing skills',
    experienceMatch: 'number (0-100)',
    recommendations: 'array of strings',
    summary: 'string'
  };
  
  const prompt = `Analyze this resume against the job requirements and provide a detailed assessment.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Requirements:
${jobRequirements}

Provide:
1. Overall match score (0-100)
2. Skills that match
3. Skills that are missing
4. Experience match score (0-100)
5. Recommendations for improvement
6. Summary of fit`;

  try {
    const screening = await getStructuredOutput(prompt, schema);
    return screening;
  } catch (error) {
    console.error('Resume screening error:', error);
    throw error;
  }
}

// ============================================
// Quick Screening (Faster, Less Detailed)
// ============================================

async function quickScreen(resumeText, jobRequirements) {
  const prompt = `Quickly assess if this resume matches the job requirements. Return a score from 0-100 and brief reason.

Resume:
${resumeText}

Job Requirements:
${jobRequirements}`;

  try {
    const response = await chatCompletion([{
      role: 'user',
      content: prompt
    }], {
      temperature: 0.3,
      max_tokens: 200
    });
    
    // Extract score from response
    const scoreMatch = response.match(/\d+/);
    const score = scoreMatch ? parseInt(scoreMatch[0]) : 50;
    
    return {
      score,
      reason: response
    };
  } catch (error) {
    console.error('Quick screening error:', error);
    throw error;
  }
}

// ============================================
// Compare Multiple Resumes
// ============================================

async function compareResumes(resumes, jobRequirements) {
  const screeningPromises = resumes.map(resume => 
    screenResume(resume, jobRequirements)
  );
  
  try {
    const results = await Promise.all(screeningPromises);
    
    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore);
    
    return results;
  } catch (error) {
    console.error('Resume comparison error:', error);
    throw error;
  }
}

// ============================================
// Generate Screening Report
// ============================================

async function generateScreeningReport(resumeData, jobRequirements) {
  const screening = await screenResume(resumeData, jobRequirements);
  
  const report = {
    candidate: {
      name: resumeData.name,
      email: resumeData.email
    },
    matchScore: screening.matchScore,
    skillsAnalysis: {
      matched: screening.skillsMatch,
      missing: screening.missingSkills,
      matchPercentage: (screening.skillsMatch.length / (screening.skillsMatch.length + screening.missingSkills.length)) * 100
    },
    experienceScore: screening.experienceMatch,
    recommendations: screening.recommendations,
    summary: screening.summary,
    screenedAt: new Date().toISOString()
  };
  
  return report;
}

module.exports = {
  screenResume,
  quickScreen,
  compareResumes,
  generateScreeningReport
};

