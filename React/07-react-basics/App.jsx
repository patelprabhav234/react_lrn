// Code was generated using AI assistance

import React from 'react';
import Button from './components/Button';
import Form from './components/Form';
import Card from './components/Card';

function App() {
  const handleButtonClick = () => {
    alert('Button clicked from App!');
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Basics Examples</h1>
      
      {/* Button Component */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Button Component</h2>
        <Button 
          text="Click Me" 
          onClick={handleButtonClick}
          variant="primary"
        />
        <Button 
          text="Secondary Button" 
          onClick={() => console.log('Secondary clicked')}
          variant="secondary"
        />
      </section>

      {/* Card Component */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Card Component</h2>
        <Card 
          title="User Profile"
          content="This is a sample card component with props."
        />
        <Card 
          title="Resume"
          content="Upload and manage your resumes here."
          footer="Last updated: Today"
        />
      </section>

      {/* Form Component */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Form Component</h2>
        <Form onSubmit={handleFormSubmit} />
      </section>

      {/* Props Example */}
      <section>
        <h2>Props Example</h2>
        <UserCard 
          name="John Doe"
          email="john@example.com"
          role="Developer"
        />
      </section>
    </div>
  );
}

// UserCard Component Example
function UserCard({ name, email, role }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default App;

