// Code was generated using AI assistance

import React, { useState, useEffect } from 'react';

// ============================================
// Basic useEffect - Run on Every Render
// ============================================

function BasicEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component rendered or state changed');
  });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ============================================
// useEffect with Empty Dependency Array - Run Once
// ============================================

function RunOnce() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data on component mount
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error:', err));
  }, []); // Empty array = run only once on mount
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

// ============================================
// useEffect with Dependencies
// ============================================

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    // Fetch user when userId changes
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [userId]); // Run when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return <div>{user.name}</div>;
}

// ============================================
// useEffect with Cleanup
// ============================================

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function - runs when component unmounts or before effect runs again
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty array = cleanup only on unmount
  
  return <div>Timer: {seconds} seconds</div>;
}

// ============================================
// Multiple useEffect Hooks
// ============================================

function MultipleEffects() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Effect for count
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // Effect for name
  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);
  
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ============================================
// useEffect for API Calls with Error Handling
// ============================================

function DataFetcher({ endpoint }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        
        // Don't update state if component unmounted
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    // Cleanup: cancel if component unmounts
    return () => {
      cancelled = true;
    };
  }, [endpoint]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}

export { 
  BasicEffect, 
  RunOnce, 
  UserProfile, 
  Timer, 
  MultipleEffects, 
  DataFetcher 
};

