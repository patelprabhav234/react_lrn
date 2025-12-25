# Topic 5: RESTful API Development

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Understand REST principles
- Design RESTful API endpoints
- Implement CRUD operations
- Handle errors properly
- Validate request data

## Overview

REST (Representational State Transfer) is an architectural style for designing web services. We'll build RESTful APIs that interact with our PostgreSQL database.

## REST Principles

- **Stateless**: Each request contains all information needed
- **Resource-based**: URLs represent resources
- **HTTP Methods**: Use GET, POST, PUT, DELETE appropriately
- **Status Codes**: Return appropriate HTTP status codes

## API Endpoint Design

### Resource Naming

```
GET    /api/users           - Get all users
GET    /api/users/:id       - Get user by ID
POST   /api/users           - Create user
PUT    /api/users/:id       - Update user
DELETE /api/users/:id       - Delete user
```

## CRUD Operations

### Create (POST)

```javascript
app.post('/api/users', async (req, res) => {
  const { email, password } = req.body;
  // Create user in database
  const user = await createUser(email, password);
  res.status(201).json(user);
});
```

### Read (GET)

```javascript
app.get('/api/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});
```

### Update (PUT)

```javascript
app.put('/api/users/:id', async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  res.json(user);
});
```

### Delete (DELETE)

```javascript
app.delete('/api/users/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).send();
});
```

See `api-routes.js` and `controllers-example.js` for complete examples.

## Error Handling

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Error Handler

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});
```

See `error-handler.js` for complete example.

## Request Validation

### Manual Validation

```javascript
app.post('/api/users', (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }
  
  // Continue...
});
```

### Using Validation Library

```bash
npm install express-validator
```

See `validation-example.js` for complete example.

## Exercises

1. Create CRUD endpoints for profiles
2. Implement error handling
3. Add request validation
4. Test endpoints with Postman or Thunder Client

## What's Next?

In the next topic, we'll add authentication and authorization.

**Previous Topic**: [04-postgresql-database](../04-postgresql-database/README.md)  
**Next Topic**: [06-authentication-authorization](../06-authentication-authorization/README.md)

