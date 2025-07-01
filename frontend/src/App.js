import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/health')
      .then(response => response.json())
      .then(data => setMessage(data.status))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Frontend</h1>
      <p>Backend Status: {message}</p>
    </div>
  );
}

export default App;
