# Topic 9: AI Integration & Resume Screening

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Set up AI API clients (OpenAI/Anthropic)
- Parse and extract information from resumes
- Implement AI-powered resume screening
- Create AI agents for candidate analysis
- Use prompt engineering effectively

## Overview

We'll integrate generative AI to add intelligent features to our resume screening application, including automated resume parsing, screening, and candidate analysis.

## Installation

```bash
npm install openai
# or
npm install @anthropic-ai/sdk
```

## Setting Up AI Client

### OpenAI Setup

```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

See `ai-client.js` for complete setup.

## Resume Parsing

Extract structured information from resume text using AI.

```javascript
async function parseResume(resumeText) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: "You are a resume parser. Extract structured information."
    }, {
      role: "user",
      content: resumeText
    }]
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

See `resume-parser.js` for complete example.

## Resume Screening

Analyze resumes against job requirements and generate match scores.

```javascript
async function screenResume(resumeData, jobRequirements) {
  const prompt = `Analyze this resume against job requirements:
  
  Resume: ${JSON.stringify(resumeData)}
  Requirements: ${jobRequirements}
  
  Provide: match score (0-100), skills match, experience match, recommendations.`;
  
  // Call AI API
}
```

See `resume-screener.js` for complete example.

## AI Agents

Create specialized agents for different tasks:

- **Resume Parser Agent**: Extracts structured data
- **Screening Agent**: Matches resumes to jobs
- **Scoring Agent**: Generates match scores
- **Summary Agent**: Creates candidate summaries

See `screening-agent.js` for agent implementation.

## Prompt Engineering

Well-crafted prompts are essential for good AI results.

### Best Practices

1. **Be Specific**: Clearly define what you want
2. **Provide Context**: Include relevant background
3. **Use Examples**: Show desired output format
4. **Iterate**: Refine prompts based on results

See `prompt-templates.js` for example prompts.

## Exercises

1. Set up AI client
2. Parse a sample resume
3. Screen resume against job requirements
4. Create a screening agent

## What's Next?

In the final topic, we'll integrate everything into a complete application.

**Previous Topic**: [08-react-hooks-state](../08-react-hooks-state/README.md)  
**Next Topic**: [10-final-project](../10-final-project/README.md)

