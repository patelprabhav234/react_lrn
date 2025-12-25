// Code was generated using AI assistance

import React from 'react';

function Card({ title, content, footer, children }) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  };

  const titleStyle = {
    marginTop: 0,
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px'
  };

  const contentStyle = {
    color: '#666',
    lineHeight: '1.6'
  };

  const footerStyle = {
    marginTop: '15px',
    paddingTop: '10px',
    borderTop: '1px solid #eee',
    fontSize: '14px',
    color: '#999'
  };

  return (
    <div style={cardStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      <div style={contentStyle}>
        {content}
        {children}
      </div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
}

export default Card;

