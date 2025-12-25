// Code was generated using AI assistance

// ============================================
// Environment Variables
// ============================================

// Access environment variables
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('USER:', process.env.USER || process.env.USERNAME);

// ============================================
// Using dotenv package
// ============================================

// First, install: npm install dotenv

// Load environment variables from .env file
require('dotenv').config();

// Now access variables
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'myapp';
const apiKey = process.env.API_KEY;

console.log('Server Configuration:');
console.log('Port:', port);
console.log('Database Host:', dbHost);
console.log('Database Name:', dbName);
console.log('API Key:', apiKey ? '***' : 'Not set');

// ============================================
// Example .env file structure
// ============================================

/*
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resume_screening
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_here
OPENAI_API_KEY=sk-your-api-key-here
*/

// ============================================
// Configuration object pattern
// ============================================

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'resume_screening',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || ''
  }
};

// Validate required environment variables
function validateConfig() {
  const required = ['DB_PASSWORD', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing.join(', '));
    process.exit(1);
  }
}

// Uncomment to validate
// validateConfig();

console.log('Configuration loaded:', {
  port: config.port,
  nodeEnv: config.nodeEnv,
  database: {
    host: config.database.host,
    name: config.database.name
  }
});

module.exports = config;

