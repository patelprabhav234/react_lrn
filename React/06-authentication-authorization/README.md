# Topic 6: Authentication & Authorization

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Implement user registration and login
- Hash passwords securely using bcrypt
- Generate and verify JWT tokens
- Create protected routes with middleware
- Understand session management

## Overview

Authentication verifies who a user is, while authorization determines what they can do. We'll implement secure authentication using JWT (JSON Web Tokens).

## Installation

```bash
npm install bcrypt jsonwebtoken
```

## Password Hashing

Never store plain text passwords! Use bcrypt to hash passwords.

### Hashing Passwords

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);
```

### Verifying Passwords

```javascript
const isValid = await bcrypt.compare(password, hash);
```

See `password-hashing.js` for complete examples.

## JWT Tokens

JWT tokens are used to authenticate users without storing sessions on the server.

### Generating Tokens

```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
```

### Verifying Tokens

```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

See `jwt-utils.js` for complete examples.

## User Registration

```javascript
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Create user
  const user = await createUser(email, passwordHash);
  
  // Generate token
  const token = generateToken(user);
  
  res.status(201).json({ user, token });
});
```

## User Login

```javascript
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate token
  const token = generateToken(user);
  
  res.json({ user, token });
});
```

See `auth-controller.js` for complete examples.

## Protected Routes

Create middleware to protect routes that require authentication.

```javascript
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Use in routes
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

See `auth-middleware.js` for complete examples.

## Exercises

1. Implement user registration
2. Implement user login
3. Create protected routes
4. Test authentication flow

## What's Next?

In the next topic, we'll start building the React frontend.

**Previous Topic**: [05-restful-apis](../05-restful-apis/README.md)  
**Next Topic**: [07-react-basics](../07-react-basics/README.md)

