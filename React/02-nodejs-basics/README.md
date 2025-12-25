# Topic 2: Node.js Fundamentals

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Understand Node.js runtime and event loop
- Work with CommonJS and ES6 modules
- Perform file system operations
- Use environment variables effectively

## Overview

Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows us to run JavaScript on the server-side, making it perfect for building backend applications.

## Node.js Runtime

Node.js provides:
- **Non-blocking I/O**: Handles multiple operations concurrently
- **Event-driven**: Uses events and callbacks
- **Single-threaded**: Efficient for I/O-intensive applications

### Running Node.js

Create a file `hello.js`:
```javascript
console.log('Hello from Node.js!');
```

Run it:
```bash
node hello.js
```

## Modules

Node.js uses a module system to organize code. There are two types:

### CommonJS Modules (Traditional)

**Exporting** (`math.js`):
```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
```

**Importing** (`app.js`):
```javascript
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

### ES6 Modules (Modern)

**Exporting** (`math.mjs`):
```javascript
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

**Importing** (`app.mjs`):
```javascript
import { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8
```

See `modules-example.js` for complete examples.

## File System Operations

Node.js `fs` module allows file operations:

### Reading Files

```javascript
const fs = require('fs');

// Synchronous (blocking)
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// Asynchronous (non-blocking) - Preferred
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});
```

### Writing Files

```javascript
const fs = require('fs');

// Write file
fs.writeFile('output.txt', 'Hello World', (err) => {
  if (err) console.error(err);
  else console.log('File written!');
});
```

See `fs-example.js` for more examples.

## Environment Variables

Environment variables store configuration outside your code.

### Using .env Files

1. Install dotenv:
```bash
npm install dotenv
```

2. Create `.env`:
```
PORT=3000
NODE_ENV=development
API_KEY=your_secret_key
```

3. Load in code:
```javascript
require('dotenv').config();

const port = process.env.PORT;
const apiKey = process.env.API_KEY;

console.log(`Server running on port ${port}`);
```

See `env-example.js` for complete example.

## Built-in Modules

Node.js provides many built-in modules:
- `fs` - File system
- `path` - Path utilities
- `http` - HTTP server
- `crypto` - Cryptographic functions
- `os` - Operating system info

## Exercises

1. Create a module that exports utility functions
2. Read and write files using fs module
3. Set up environment variables for your project

## What's Next?

In the next topic, we'll build a web server using Express.js.

**Previous Topic**: [01-introduction-setup](../01-introduction-setup/README.md)  
**Next Topic**: [03-express-server](../03-express-server/README.md)

