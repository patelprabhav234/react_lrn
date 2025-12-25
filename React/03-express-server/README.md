# Topic 3: Express.js Server Setup

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Create an Express.js server
- Understand routing and route handlers
- Use middleware effectively
- Handle HTTP requests and responses

## Overview

Express.js is a minimal and flexible Node.js web framework that provides features for building web applications and APIs.

## Installation

```bash
npm install express
```

## Basic Server Setup

### Simple Express Server

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

See `server.js` for complete example.

## Routing

Routes define how your application responds to client requests.

### Basic Routes

```javascript
// GET request
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST request
app.post('/users', (req, res) => {
  res.json({ message: 'Create user' });
});

// PUT request
app.put('/users/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});
```

### Route Parameters

```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});
```

### Query Parameters

```javascript
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page: page || 1 });
});
```

See `routes-example.js` for more examples.

## Middleware

Middleware functions have access to request, response, and next function.

### Built-in Middleware

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

### Custom Middleware

```javascript
// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

See `middleware-example.js` for complete examples.

## Request and Response

### Request Object

```javascript
app.post('/users', (req, res) => {
  // Request body
  const { name, email } = req.body;
  
  // Request headers
  const authHeader = req.headers.authorization;
  
  // Request parameters
  const userId = req.params.id;
  
  // Query parameters
  const { page } = req.query;
});
```

### Response Object

```javascript
// Send JSON
res.json({ message: 'Success' });

// Send status code
res.status(201).json({ id: 1 });

// Redirect
res.redirect('/login');

// Send file
res.sendFile(path.join(__dirname, 'index.html'));
```

## Exercises

1. Create an Express server with multiple routes
2. Implement custom middleware for logging
3. Handle different HTTP methods (GET, POST, PUT, DELETE)

## What's Next?

In the next topic, we'll connect to PostgreSQL database.

**Previous Topic**: [02-nodejs-basics](../02-nodejs-basics/README.md)  
**Next Topic**: [04-postgresql-database](../04-postgresql-database/README.md)

