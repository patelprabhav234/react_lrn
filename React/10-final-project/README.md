# Topic 10: Final Project - Resume Screening & Profile Management

**Code was generated using AI assistance**

## Project Overview

This is the complete Resume Screening & Profile Management application that integrates all concepts learned throughout the workshop.

## Features

### 1. Authentication System
- User registration with email/password
- Secure login with JWT tokens
- Protected routes and middleware
- Password hashing with bcrypt

### 2. User Profile Management (CRUD)
- Create user profile
- View profile details
- Update profile information
- Delete profile (soft delete)

### 3. Resume Management
- Upload resume files (PDF, DOCX)
- Store resume metadata in database
- View uploaded resumes
- Update resume information
- Delete resumes

### 4. AI-Powered Resume Screening
- **Resume Parser Agent**: Extract information from resumes
- **Screening Agent**: Analyze resume against job requirements
- **Scoring Agent**: Generate match scores
- **Summary Agent**: Create candidate summaries

### 5. Dashboard & Search
- User dashboard with profile overview
- Resume screening history
- Search and filter profiles
- View screening scores and insights

## Project Structure

```
10-final-project/
├── backend/          # Node.js + Express server
├── frontend/         # React application
├── database/         # SQL schemas and migrations
└── agents/           # AI agent implementations
```

## Setup Instructions

### 1. Database Setup

```bash
cd database
psql -U postgres -d resume_screening -f schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create `.env` file in backend:

```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resume_screening
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Profiles
- `GET /api/profiles/:userId` - Get profile
- `POST /api/profiles` - Create profile
- `PUT /api/profiles/:userId` - Update profile
- `DELETE /api/profiles/:userId` - Delete profile

### Resumes
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Upload resume
- `GET /api/resumes/:id` - Get resume
- `DELETE /api/resumes/:id` - Delete resume

### Screening
- `POST /api/screening/screen` - Screen resume
- `GET /api/screening/results/:resumeId` - Get screening results

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: React, React Hooks, Context API
- **Authentication**: JWT, bcrypt
- **AI**: OpenAI API
- **File Upload**: Multer

## Key Concepts Demonstrated

1. ✅ RESTful API design
2. ✅ Database design and queries
3. ✅ Authentication and authorization
4. ✅ React components and hooks
5. ✅ State management with Context API
6. ✅ AI integration and agents
7. ✅ File upload and storage
8. ✅ Error handling and validation

## Next Steps

1. Run the application
2. Register a new user
3. Create a profile
4. Upload a resume
5. Screen the resume against job requirements
6. View results and recommendations

## Best Practices

- Always validate input
- Use environment variables for secrets
- Handle errors gracefully
- Use async/await for async operations
- Keep components small and focused
- Use meaningful variable names
- Comment complex logic

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify credentials in .env
- Test connection with psql

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure token is sent in Authorization header

### AI API Issues
- Verify OPENAI_API_KEY is set
- Check API quota/limits
- Handle rate limiting

## Congratulations!

You've completed the Full Stack Development Workshop! You now have:
- A complete full-stack application
- Understanding of modern web development
- Experience with AI integration
- Skills to build your own applications

Keep building and learning! 🚀

