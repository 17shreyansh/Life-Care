import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import api from '../services/api';

const TestApi = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Test API on component mount
  useEffect(() => {
    testApi();
  }, []);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    // Try multiple connection methods
    const endpoints = [
      { name: 'Proxy Server', url: 'http://localhost:8080/proxy/api/counsellors' },
      { name: 'Direct API', url: 'http://localhost:5000/api/counsellors' },
      { name: 'API Service', url: '/api/counsellors', useService: true }
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying ${endpoint.name}...`);
        
        let response;
        if (endpoint.useService) {
          // Use our API service
          response = await api.get('/counsellors');
        } else {
          // Direct axios call
          response = await axios({
            method: 'get',
            url: endpoint.url,
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: false
          });
        }
        
        setResult({
          method: endpoint.name,
          data: response.data
        });
        console.log(`${endpoint.name} succeeded:`, response.data);
        break; // Stop trying if one succeeds
      } catch (err) {
        console.error(`${endpoint.name} failed:`, err);
        // Continue to next endpoint if this one fails
      }
    }
    
    // If we get here and result is still null, all methods failed
    if (!result) {
      setError('All connection methods failed');
    }
    
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <h2>API Connection Test</h2>
      <p>Testing connection to http://localhost:5000/api/counsellors</p>
      
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p className="mt-2">Testing API connection...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-3">
          <strong>Error:</strong> {error}
          <div className="mt-3">
            <Button variant="primary" onClick={testApi}>Try Again</Button>
          </div>
        </Alert>
      ) : (
        <Alert variant="success" className="mt-3">
          <strong>Success!</strong> API is working correctly.
          <pre className="mt-2 bg-light p-3" style={{maxHeight: '300px', overflow: 'auto'}}>
            {JSON.stringify(result, null, 2)}
          </pre>
          <div className="mt-3">
            <Button variant="primary" onClick={testApi}>Test Again</Button>
          </div>
        </Alert>
      )}
    </Container>
  );
};

export default TestApi;