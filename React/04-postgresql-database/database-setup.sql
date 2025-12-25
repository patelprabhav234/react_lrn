-- Code was generated using AI assistance

-- ============================================
-- Database Setup Script
-- ============================================

-- Create database (run this in psql as superuser)
-- CREATE DATABASE resume_screening;

-- Connect to database
-- \c resume_screening

-- ============================================
-- Enable UUID extension (optional)
-- ============================================

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Users Table
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Profiles Table
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  bio TEXT,
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- ============================================
-- Resumes Table
-- ============================================

CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Screening Results Table
-- ============================================

CREATE TABLE IF NOT EXISTS screening_results (
  id SERIAL PRIMARY KEY,
  resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  job_requirements TEXT,
  match_score DECIMAL(5,2),
  skills_extracted TEXT[],
  experience_summary TEXT,
  recommendations TEXT,
  screened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_screening_results_resume_id ON screening_results(resume_id);

-- ============================================
-- Sample Data (for testing)
-- ============================================

-- Insert sample user
INSERT INTO users (email, password_hash) 
VALUES ('test@example.com', '$2b$10$example_hashed_password')
ON CONFLICT (email) DO NOTHING;

-- Insert sample profile
INSERT INTO profiles (user_id, name, phone, bio)
SELECT id, 'John Doe', '123-456-7890', 'Software Developer'
FROM users WHERE email = 'test@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- Useful Queries
-- ============================================

-- View all tables
-- \dt

-- Describe table structure
-- \d users
-- \d profiles
-- \d resumes

-- Drop all tables (use with caution!)
-- DROP TABLE IF EXISTS screening_results CASCADE;
-- DROP TABLE IF EXISTS resumes CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

