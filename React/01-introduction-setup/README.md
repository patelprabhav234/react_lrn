# Topic 1: Introduction & Environment Setup

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Understand the workshop structure and learning path
- Install and verify Node.js, npm, and PostgreSQL
- Set up your development environment
- Understand the project structure we'll be building

## Overview

This workshop will guide you through building a complete Resume Screening & Profile Management application. We'll use:
- **React** for the frontend
- **Node.js & Express** for the backend
- **PostgreSQL** for the database
- **AI/LLM APIs** for intelligent resume screening

## Prerequisites Check

Before proceeding, ensure you have:

### 1. Node.js Installation

Check if Node.js is installed:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. npm Installation

npm comes with Node.js. Verify:
```bash
npm --version
```

### 3. PostgreSQL Installation

Check if PostgreSQL is installed:
```bash
psql --version
```

If not installed:
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### 4. Code Editor

We recommend VS Code with extensions:
- ESLint
- Prettier
- PostgreSQL

## Project Structure

Our workshop will follow this structure:

```
workshop/
├── 01-introduction-setup/     ← You are here
├── 02-nodejs-basics/
├── 03-express-server/
├── 04-postgresql-database/
├── 05-restful-apis/
├── 06-authentication-authorization/
├── 07-react-basics/
├── 08-react-hooks-state/
├── 09-ai-integration-resume-screening/
└── 10-final-project/
```

## Development Environment Setup

### Step 1: Create Project Directory

```bash
mkdir resume-screening-workshop
cd resume-screening-workshop
```

### Step 2: Initialize Node.js Project

```bash
npm init -y
```

This creates a `package.json` file. See `package.json` template in this folder.

### Step 3: Set Up PostgreSQL Database

1. Start PostgreSQL service
2. Create a new database:
```sql
CREATE DATABASE resume_screening;
```

### Step 4: Environment Variables

Create a `.env` file (we'll use this later):
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resume_screening
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
```

**Important**: Never commit `.env` files to version control!

## What's Next?

In the next topic, we'll explore:
- Node.js runtime and modules
- File system operations
- Environment variables

**Next Topic**: [02-nodejs-basics](../02-nodejs-basics/README.md)

## Exercises

1. Verify all prerequisites are installed
2. Create your project directory
3. Initialize a new Node.js project
4. Set up PostgreSQL database

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)

