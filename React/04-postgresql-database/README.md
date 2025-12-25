# Topic 4: PostgreSQL Database

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Set up PostgreSQL database
- Design database schemas
- Write SQL queries (SELECT, INSERT, UPDATE, DELETE)
- Connect Node.js to PostgreSQL using pg library
- Use connection pooling

## Overview

PostgreSQL is a powerful, open-source relational database. We'll use it to store user data, profiles, and resumes for our application.

## Installation

### Install PostgreSQL

- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### Install pg Library

```bash
npm install pg
```

## Database Setup

### Create Database

```sql
CREATE DATABASE resume_screening;
```

### Connect to Database

```bash
psql -U postgres -d resume_screening
```

See `database-setup.sql` for complete setup script.

## Database Schema Design

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Profiles Table

```sql
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Resumes Table

```sql
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

See `schema.sql` for complete schema.

## Connecting Node.js to PostgreSQL

### Basic Connection

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'resume_screening',
  user: 'postgres',
  password: 'your_password'
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});
```

See `db-connection.js` for complete example.

## SQL Queries

### SELECT

```sql
-- Get all users
SELECT * FROM users;

-- Get user by ID
SELECT * FROM users WHERE id = 1;

-- Join tables
SELECT u.email, p.name 
FROM users u 
JOIN profiles p ON u.id = p.user_id;
```

### INSERT

```sql
-- Insert user
INSERT INTO users (email, password_hash) 
VALUES ('user@example.com', 'hashed_password')
RETURNING *;
```

### UPDATE

```sql
-- Update profile
UPDATE profiles 
SET name = 'John Doe', updated_at = CURRENT_TIMESTAMP 
WHERE user_id = 1;
```

### DELETE

```sql
-- Delete user (cascade deletes profile)
DELETE FROM users WHERE id = 1;
```

See `queries-example.js` for Node.js query examples.

## Connection Pooling

Connection pooling improves performance by reusing database connections.

```javascript
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Exercises

1. Create the database schema
2. Insert sample data
3. Write queries to retrieve and update data
4. Set up connection pooling

## What's Next?

In the next topic, we'll build RESTful APIs that interact with the database.

**Previous Topic**: [03-express-server](../03-express-server/README.md)  
**Next Topic**: [05-restful-apis](../05-restful-apis/README.md)

