// Code was generated using AI assistance

// ============================================
// Custom Error Classes
// ============================================

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// ============================================
// Error Handler Middleware
// ============================================

function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
}

// Development error response
function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    success: false,
    error: {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack
    }
  });
}

// Production error response
function sendErrorProd(err, res) {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        status: err.status,
        message: err.message
      }
    });
  } else {
    // Programming or unknown error: don't leak error details
    console.error('ERROR 💥', err);
    
    res.status(500).json({
      success: false,
      error: {
        status: 'error',
        message: 'Something went wrong!'
      }
    });
  }
}

// ============================================
// Async Error Handler Wrapper
// ============================================

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// ============================================
// 404 Handler
// ============================================

function notFoundHandler(req, res, next) {
  const err = new NotFoundError(`Route ${req.originalUrl}`);
  next(err);
}

// ============================================
// Database Error Handler
// ============================================

function handleDatabaseError(err) {
  // PostgreSQL unique constraint violation
  if (err.code === '23505') {
    return new ValidationError('Duplicate entry. This record already exists.');
  }
  
  // PostgreSQL foreign key violation
  if (err.code === '23503') {
    return new ValidationError('Referenced record does not exist.');
  }
  
  // PostgreSQL not null violation
  if (err.code === '23502') {
    return new ValidationError('Required field is missing.');
  }
  
  return err;
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  errorHandler,
  asyncHandler,
  notFoundHandler,
  handleDatabaseError
};

