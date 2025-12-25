// Code was generated using AI assistance

require('dotenv').config();

// ============================================
// OpenAI Client Setup
// ============================================

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ============================================
// Basic Chat Completion
// ============================================

async function chatCompletion(messages, options = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      messages: messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      ...options
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

// ============================================
// Streaming Response
// ============================================

async function streamCompletion(messages, onChunk) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      stream: true
    });
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content && onChunk) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Streaming Error:', error);
    throw error;
  }
}

// ============================================
// Structured Output (JSON Mode)
// ============================================

async function getStructuredOutput(prompt, schema) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: `You are a helpful assistant. Return responses in valid JSON format matching this schema: ${JSON.stringify(schema)}`
      }, {
        role: 'user',
        content: prompt
      }],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Structured Output Error:', error);
    throw error;
  }
}

// ============================================
// Example Usage
// ============================================

async function example() {
  // Simple chat
  const response = await chatCompletion([
    { role: 'user', content: 'What is React?' }
  ]);
  console.log('Response:', response);
  
  // Structured output
  const structured = await getStructuredOutput(
    'Extract name, email, and skills from: John Doe, john@example.com, knows JavaScript and React',
    {
      name: 'string',
      email: 'string',
      skills: 'array of strings'
    }
  );
  console.log('Structured:', structured);
}

module.exports = {
  openai,
  chatCompletion,
  streamCompletion,
  getStructuredOutput
};

// Run example if executed directly
if (require.main === module) {
  example().catch(console.error);
}

