# Topic 7: React Basics & Components

**Code was generated using AI assistance**

## Learning Objectives

By the end of this topic, you will be able to:
- Understand React and JSX
- Create functional components
- Use props to pass data
- Handle events
- Build forms

## Overview

React is a JavaScript library for building user interfaces. We'll learn the fundamentals to build our frontend.

## Setting Up React

### Create React App

```bash
npx create-react-app resume-screening-app
cd resume-screening-app
npm start
```

### Or Use Vite (Faster)

```bash
npm create vite@latest resume-screening-app -- --template react
cd resume-screening-app
npm install
npm run dev
```

## JSX

JSX is a syntax extension that lets you write HTML-like code in JavaScript.

```jsx
const element = <h1>Hello, React!</h1>;
```

### JSX Rules

- Return single element (or Fragment)
- Use className instead of class
- Self-closing tags need `/`
- Use camelCase for attributes

```jsx
<div className="container">
  <img src="logo.png" alt="Logo" />
</div>
```

## Components

### Functional Components

```jsx
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Or arrow function
const Welcome = () => {
  return <h1>Welcome to React!</h1>;
};
```

### Using Components

```jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}
```

## Props

Props pass data from parent to child components.

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="John" />
```

### Destructuring Props

```jsx
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>;
}
```

See `App.jsx` and component examples for more.

## Event Handling

```jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

## Form Handling

```jsx
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

See `components/Form.jsx` for complete examples.

## Exercises

1. Create a UserCard component with props
2. Build a login form
3. Create a button component with click handler
4. Build a profile display component

## What's Next?

In the next topic, we'll learn about React Hooks and state management.

**Previous Topic**: [06-authentication-authorization](../06-authentication-authorization/README.md)  
**Next Topic**: [08-react-hooks-state](../08-react-hooks-state/README.md)

