// Code was generated using AI assistance

const { chatCompletion, getStructuredOutput } = require('./ai-client');

// ============================================
// Resume Parser
// ============================================

async function parseResume(resumeText) {
  const schema = {
    name: 'string',
    email: 'string',
    phone: 'string',
    skills: 'array of strings',
    experience: 'array of objects with company, role, duration, description',
    education: 'array of objects with institution, degree, year',
    summary: 'string'
  };
  
  const prompt = `Parse the following resume text and extract structured information. Return JSON format.

Resume Text:
${resumeText}

Extract:
- Name
- Email
- Phone
- Skills (list)
- Work Experience (company, role, duration, description)
- Education (institution, degree, year)
- Professional Summary`;

  try {
    const parsed = await getStructuredOutput(prompt, schema);
    return parsed;
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw error;
  }
}

// ============================================
// Extract Skills
// ============================================

async function extractSkills(resumeText) {
  const prompt = `Extract all technical and professional skills from this resume text. Return as a JSON array of strings.

Resume Text:
${resumeText}`;

  try {
    const response = await chatCompletion([{
      role: 'system',
      content: 'You are a resume parser. Extract skills and return as JSON array.'
    }, {
      role: 'user',
      content: prompt
    }], {
      response_format: { type: 'json_object' }
    });
    
    const result = JSON.parse(response);
    return result.skills || [];
  } catch (error) {
    console.error('Skills extraction error:', error);
    return [];
  }
}

// ============================================
// Extract Experience Summary
// ============================================

async function extractExperienceSummary(resumeText) {
  const prompt = `Summarize the work experience from this resume. Include total years of experience, key roles, and industries.

Resume Text:
${resumeText}`;

  try {
    const summary = await chatCompletion([{
      role: 'user',
      content: prompt
    }]);
    
    return summary;
  } catch (error) {
    console.error('Experience extraction error:', error);
    return '';
  }
}

// ============================================
// Enhanced Parser with Validation
// ============================================

async function parseResumeWithValidation(resumeText) {
  try {
    const parsed = await parseResume(resumeText);
    
    // Validate parsed data
    if (!parsed.name || !parsed.email) {
      throw new Error('Missing required fields: name or email');
    }
    
    // Enhance with additional extraction
    if (!parsed.skills || parsed.skills.length === 0) {
      parsed.skills = await extractSkills(resumeText);
    }
    
    return parsed;
  } catch (error) {
    console.error('Resume parsing with validation error:', error);
    throw error;
  }
}

module.exports = {
  parseResume,
  extractSkills,
  extractExperienceSummary,
  parseResumeWithValidation
};

