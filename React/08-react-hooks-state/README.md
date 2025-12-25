# Topic 8: React Hooks & State Management

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Use useState hook for component state
- Use useEffect hook for side effects
- Create custom hooks
- Manage global state with Context API

## Overview

React Hooks allow functional components to have state and lifecycle methods. We'll learn the most important hooks for building our application.

## useState Hook

`useState` lets you add state to functional components.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Or use object
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
}
```

See `useState-example.jsx` for complete examples.

## useEffect Hook

`useEffect` handles side effects like API calls, subscriptions, etc.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch user data
    fetchUser(userId).then(setUser);
  }, [userId]); // Run when userId changes
  
  return <div>{user?.name}</div>;
}
```

### Cleanup

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

See `useEffect-example.jsx` for complete examples.

## Custom Hooks

Custom hooks let you extract component logic into reusable functions.

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Context API

Context API provides a way to share state across components without prop drilling.

### Create Context

```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

### Use Context

```jsx
function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return <div>Welcome, {user?.name}</div>;
}
```

See `context-example.jsx` for complete examples.

## Exercises

1. Create a counter with useState
2. Fetch data with useEffect
3. Create a custom hook for API calls
4. Set up Context API for authentication

## What's Next?

In the next topic, we'll integrate AI for resume screening.

**Previous Topic**: [07-react-basics](../07-react-basics/README.md)  
**Next Topic**: [09-ai-integration-resume-screening](../09-ai-integration-resume-screening/README.md)

