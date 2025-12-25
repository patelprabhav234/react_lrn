// Code was generated using AI assistance

const fs = require('fs');
const path = require('path');

// ============================================
// Reading Files
// ============================================

// Synchronous read (blocking)
try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('File content (sync):', data);
} catch (err) {
  console.error('Error reading file:', err.message);
}

// Asynchronous read (non-blocking) - Preferred
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File content (async):', data);
});

// Promise-based read (Node.js 14+)
fs.promises.readFile('example.txt', 'utf8')
  .then(data => console.log('File content (promise):', data))
  .catch(err => console.error('Error:', err));

// ============================================
// Writing Files
// ============================================

// Write file (creates or overwrites)
const content = 'Hello, Node.js!\nThis is a new file.';
fs.writeFile('output.txt', content, (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully!');
});

// Append to file
fs.appendFile('output.txt', '\nAppended line', (err) => {
  if (err) console.error('Error appending:', err);
  else console.log('Content appended!');
});

// ============================================
// File Information
// ============================================

fs.stat('example.txt', (err, stats) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File size:', stats.size, 'bytes');
  console.log('Is file?', stats.isFile());
  console.log('Is directory?', stats.isDirectory());
  console.log('Created:', stats.birthtime);
  console.log('Modified:', stats.mtime);
});

// ============================================
// Directory Operations
// ============================================

// Read directory
fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Files in directory:', files);
});

// Create directory
fs.mkdir('new-folder', { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }
  console.log('Directory created!');
});

// ============================================
// Path Utilities
// ============================================

const filePath = path.join(__dirname, 'data', 'file.txt');
console.log('Full path:', filePath);
console.log('Directory:', path.dirname(filePath));
console.log('Filename:', path.basename(filePath));
console.log('Extension:', path.extname(filePath));

// ============================================
// Check if file exists
// ============================================

fs.access('example.txt', fs.constants.F_OK, (err) => {
  if (err) {
    console.log('File does not exist');
  } else {
    console.log('File exists!');
  }
});

