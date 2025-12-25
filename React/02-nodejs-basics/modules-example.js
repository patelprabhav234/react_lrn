// Code was generated using AI assistance

// ============================================
// CommonJS Modules Example
// ============================================

// math.js - Exporting module
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Export multiple functions
module.exports = {
  add,
  subtract,
  multiply,
  divide
};

// Alternative export syntax:
// module.exports.add = add;
// module.exports.subtract = subtract;

// ============================================
// Using the module (in another file)
// ============================================

// app.js
const math = require('./modules-example');

console.log('Addition:', math.add(10, 5));        // 15
console.log('Subtraction:', math.subtract(10, 5)); // 5
console.log('Multiplication:', math.multiply(10, 5)); // 50
console.log('Division:', math.divide(10, 5));     // 2

// Destructuring import
const { add, subtract } = require('./modules-example');
console.log('Using destructuring:', add(20, 10)); // 30

// ============================================
// ES6 Modules Example (requires .mjs extension or type: "module" in package.json)
// ============================================

// math.mjs
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// app.mjs
import multiply, { add, subtract } from './math.mjs';
console.log(add(5, 3));
console.log(multiply(4, 2));

