// Code was generated using AI assistance

import React from 'react';

function Button({ text, onClick, variant = 'primary', disabled = false }) {
  const buttonStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: 'white',
    opacity: disabled ? 0.6 : 1,
    margin: '5px'
  };

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;

