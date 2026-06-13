import React, { useState } from 'react';

function TestApi() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResponse('');
    
    try {
      // The relative path automatically routes to your Flask server
      const res = await fetch('/api/test'); 
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(data.message);
      
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: 'rgba(255, 255, 255, 0.8)', 
      borderRadius: '12px', 
      margin: '20px auto',
      maxWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#333', marginBottom: '15px' }}>Flask API Connection Test</h3>
      
      <button 
        onClick={testConnection} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Pinging Server...' : 'Test Connection'}
      </button>

      <div style={{ marginTop: '20px', minHeight: '30px' }}>
        {response && <p style={{ color: '#059669', fontWeight: 'bold' }}>✅ {response}</p>}
        {error && <p style={{ color: '#dc2626', fontWeight: 'bold' }}>❌ Error: {error}</p>}
      </div>
    </div>
  );
}

export default TestApi;