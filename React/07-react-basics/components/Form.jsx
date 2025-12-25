// Code was generated using AI assistance

import React, { useState } from 'react';

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Call parent's onSubmit handler
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
}

export default Form;

