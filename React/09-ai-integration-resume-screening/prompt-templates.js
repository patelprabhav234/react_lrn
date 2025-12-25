// Code was generated using AI assistance

// ============================================
// Prompt Templates for Resume Screening
// ============================================

const PROMPT_TEMPLATES = {
  // Resume Parsing
  PARSE_RESUME: (resumeText) => `Parse the following resume and extract structured information in JSON format.

Resume Text:
${resumeText}

Extract and return:
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "skills": ["array", "of", "strings"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "year": "number"
    }
  ],
  "summary": "string"
}`,

  // Resume Screening
  SCREEN_RESUME: (resumeData, jobRequirements) => `Analyze this resume against the job requirements and provide a detailed assessment.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Requirements:
${jobRequirements}

Provide analysis in JSON format:
{
  "matchScore": 0-100,
  "skillsMatch": ["matched", "skills"],
  "missingSkills": ["missing", "skills"],
  "experienceMatch": 0-100,
  "recommendations": ["recommendation1", "recommendation2"],
  "summary": "Overall assessment summary"
}`,

  // Skills Extraction
  EXTRACT_SKILLS: (resumeText) => `Extract all technical and professional skills from this resume. Return as a JSON array.

Resume:
${resumeText}

Return format:
{
  "skills": ["skill1", "skill2", "skill3"]
}`,

  // Experience Summary
  EXPERIENCE_SUMMARY: (resumeText) => `Summarize the work experience from this resume. Include:
- Total years of experience
- Key roles and responsibilities
- Industries worked in
- Notable achievements

Resume:
${resumeText}`,

  // Candidate Summary
  CANDIDATE_SUMMARY: (resumeData, screeningResults) => `Generate a professional 2-3 sentence candidate summary.

Resume Highlights:
- Name: ${resumeData.name}
- Key Skills: ${resumeData.skills?.join(', ')}
- Experience: ${resumeData.experience?.length || 0} positions

Screening Results:
- Match Score: ${screeningResults.matchScore}%
- Key Strengths: ${screeningResults.skillsMatch?.join(', ')}

Create a summary highlighting qualifications and fit for the role.`,

  // Recommendation Generation
  RECOMMENDATIONS: (resumeData, jobRequirements) => `Based on this resume and job requirements, provide actionable recommendations.

Resume:
${JSON.stringify(resumeData)}

Job Requirements:
${jobRequirements}

Provide 3-5 specific recommendations for:
1. Skills to develop
2. Experience to gain
3. How to better match the role

Format as JSON array of recommendation strings.`
};

// ============================================
// Helper Functions
// ============================================

function getPrompt(templateName, ...args) {
  const template = PROMPT_TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }
  return template(...args);
}

// ============================================
// System Prompts
// ============================================

const SYSTEM_PROMPTS = {
  RESUME_PARSER: `You are an expert resume parser. Extract structured information from resumes accurately. Always return valid JSON.`,
  
  SCREENING_ANALYST: `You are a hiring analyst. Evaluate resumes against job requirements objectively. Provide detailed, actionable feedback.`,
  
  SKILLS_EXTRACTOR: `You are a skills identification expert. Extract all technical and professional skills from resumes comprehensively.`,
  
  SUMMARY_WRITER: `You are a professional recruiter. Write concise, informative candidate summaries that highlight key qualifications.`
};

function getSystemPrompt(agentType) {
  return SYSTEM_PROMPTS[agentType] || 'You are a helpful assistant.';
}

module.exports = {
  PROMPT_TEMPLATES,
  SYSTEM_PROMPTS,
  getPrompt,
  getSystemPrompt
};

