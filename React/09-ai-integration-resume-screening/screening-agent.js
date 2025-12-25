// Code was generated using AI assistance

const { chatCompletion } = require('./ai-client');
const { parseResume } = require('./resume-parser');
const { screenResume } = require('./resume-screener');

// ============================================
// Resume Parser Agent
// ============================================

class ResumeParserAgent {
  async process(resumeText) {
    console.log('Resume Parser Agent: Processing resume...');
    
    try {
      const parsed = await parseResume(resumeText);
      console.log('Resume Parser Agent: Extraction complete');
      return parsed;
    } catch (error) {
      console.error('Resume Parser Agent: Error', error);
      throw error;
    }
  }
}

// ============================================
// Screening Agent
// ============================================

class ScreeningAgent {
  async process(resumeData, jobRequirements) {
    console.log('Screening Agent: Analyzing resume...');
    
    try {
      const screening = await screenResume(resumeData, jobRequirements);
      console.log('Screening Agent: Analysis complete');
      return screening;
    } catch (error) {
      console.error('Screening Agent: Error', error);
      throw error;
    }
  }
}

// ============================================
// Scoring Agent
// ============================================

class ScoringAgent {
  async calculateScore(resumeData, jobRequirements) {
    console.log('Scoring Agent: Calculating match score...');
    
    const prompt = `Calculate a match score (0-100) for this resume against job requirements.

Resume: ${JSON.stringify(resumeData)}
Requirements: ${jobRequirements}

Consider:
- Skills match (40%)
- Experience relevance (30%)
- Education match (20%)
- Overall fit (10%)

Return only the numeric score.`;

    try {
      const response = await chatCompletion([{
        role: 'user',
        content: prompt
      }], {
        temperature: 0.2,
        max_tokens: 50
      });
      
      const score = parseInt(response.match(/\d+/)?.[0] || '0');
      console.log('Scoring Agent: Score calculated:', score);
      return score;
    } catch (error) {
      console.error('Scoring Agent: Error', error);
      return 0;
    }
  }
}

// ============================================
// Summary Agent
// ============================================

class SummaryAgent {
  async generateSummary(resumeData, screeningResults) {
    console.log('Summary Agent: Generating candidate summary...');
    
    const prompt = `Generate a professional candidate summary based on resume and screening results.

Resume: ${JSON.stringify(resumeData)}
Screening: ${JSON.stringify(screeningResults)}

Create a 2-3 sentence summary highlighting:
- Key qualifications
- Match to role
- Notable strengths`;

    try {
      const summary = await chatCompletion([{
        role: 'user',
        content: prompt
      }], {
        temperature: 0.5,
        max_tokens: 200
      });
      
      console.log('Summary Agent: Summary generated');
      return summary;
    } catch (error) {
      console.error('Summary Agent: Error', error);
      return '';
    }
  }
}

// ============================================
// Master Agent (Orchestrates all agents)
// ============================================

class MasterScreeningAgent {
  constructor() {
    this.parserAgent = new ResumeParserAgent();
    this.screeningAgent = new ScreeningAgent();
    this.scoringAgent = new ScoringAgent();
    this.summaryAgent = new SummaryAgent();
  }
  
  async processResume(resumeText, jobRequirements) {
    console.log('Master Agent: Starting resume processing pipeline...');
    
    try {
      // Step 1: Parse resume
      const parsedResume = await this.parserAgent.process(resumeText);
      
      // Step 2: Screen resume
      const screening = await this.screeningAgent.process(parsedResume, jobRequirements);
      
      // Step 3: Calculate score
      const score = await this.scoringAgent.calculateScore(parsedResume, jobRequirements);
      
      // Step 4: Generate summary
      const summary = await this.summaryAgent.generateSummary(parsedResume, screening);
      
      const result = {
        resume: parsedResume,
        screening,
        score,
        summary,
        processedAt: new Date().toISOString()
      };
      
      console.log('Master Agent: Processing complete');
      return result;
    } catch (error) {
      console.error('Master Agent: Pipeline error', error);
      throw error;
    }
  }
}

module.exports = {
  ResumeParserAgent,
  ScreeningAgent,
  ScoringAgent,
  SummaryAgent,
  MasterScreeningAgent
};

