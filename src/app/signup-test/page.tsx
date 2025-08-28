'use client';
import { useState, useEffect } from 'react';

export default function SignupTestPage() {
  const [env, setEnv] = useState<any>(null);
  const [apiTest, setApiTest] = useState<string>('');
  const [registrationEnabled, setRegistrationEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    // Test environment variables
    fetch('/debug')
      .then(res => res.json())
      .then(data => setEnv(data))
      .catch(err => setEnv({ error: err.message }));

    // Test registration API
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test', password: 'test123456' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Public registration is disabled') {
          setRegistrationEnabled(false);
          setApiTest('Registration is disabled');
        } else if (data.message === 'User already exists' || data.message === 'User registered successfully') {
          setRegistrationEnabled(true);
          setApiTest('Registration API is working');
        } else {
          setApiTest(`API response: ${JSON.stringify(data)}`);
        }
      })
      .catch(err => setApiTest(`API error: ${err.message}`));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Signup Debug Page</h1>
      
      <h2>Environment Variables:</h2>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(env, null, 2)}
      </pre>

      <h2>Registration API Test:</h2>
      <p>Status: {apiTest}</p>
      <p>Registration Enabled: {registrationEnabled === null ? 'Testing...' : registrationEnabled.toString()}</p>

      <h2>File Check:</h2>
      <p>This page exists at: /signup-test</p>
      <p>If you can see this, the deployment is working.</p>

      <h2>Links to Test:</h2>
      <ul>
        <li><a href="/signup">Go to Signup Page</a></li>
        <li><a href="/login">Go to Login Page</a></li>
        <li><a href="/debug">Debug Endpoint</a></li>
      </ul>

      <h2>Manual API Test:</h2>
      <p>Try this curl command:</p>
      <code style={{ background: '#f5f5f5', padding: '5px', display: 'block' }}>
        curl -X POST {window.location.origin}/api/auth/register -H "Content-Type: application/json" -d '{`{"username":"testuser","password":"password123"}`}'
      </code>
    </div>
  );
}