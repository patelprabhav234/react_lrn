// Code was generated using AI assistance

const { Pool } = require('pg');
require('dotenv').config();

// ============================================
// Database Connection Pool
// ============================================

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'resume_screening',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
});

// ============================================
// Test Connection
// ============================================

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test query
async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

// ============================================
// Query Helper Functions
// ============================================

// Execute query with error handling
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Query error', { text, error: error.message });
    throw error;
  }
}

// Get a client from the pool (for transactions)
async function getClient() {
  const client = await pool.connect();
  const query = client.query.bind(client);
  const release = client.release.bind(client);
  
  // Set a timeout on the client
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
  }, 5000);
  
  // Monkey patch the query method to log the queries
  client.query = (...args) => {
    client.lastQuery = args;
    return query(...args);
  };
  
  client.release = () => {
    clearTimeout(timeout);
    return release();
  };
  
  return client;
}

// ============================================
// Example Usage
// ============================================

async function exampleQueries() {
  try {
    // Simple query
    const users = await query('SELECT * FROM users LIMIT 5');
    console.log('Users:', users.rows);
    
    // Parameterized query
    const user = await query('SELECT * FROM users WHERE email = $1', ['test@example.com']);
    console.log('User:', user.rows[0]);
    
    // Insert with returning
    const newUser = await query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      ['newuser@example.com', 'hashed_password']
    );
    console.log('New user:', newUser.rows[0]);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// Transaction Example
// ============================================

async function createUserWithProfile(userData, profileData) {
  const client = await getClient();
  
  try {
    await client.query('BEGIN');
    
    // Insert user
    const userResult = await client.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [userData.email, userData.password_hash]
    );
    const userId = userResult.rows[0].id;
    
    // Insert profile
    await client.query(
      'INSERT INTO profiles (user_id, name, phone) VALUES ($1, $2, $3)',
      [userId, profileData.name, profileData.phone]
    );
    
    await client.query('COMMIT');
    return userId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// ============================================
// Export
// ============================================

module.exports = {
  pool,
  query,
  getClient,
  testConnection
};

// Run test if executed directly
if (require.main === module) {
  testConnection();
}

