export default function BasicSignupPage() {
  return (
    <html>
      <head>
        <title>Basic Signup - Oravo</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', padding: '50px', textAlign: 'center' }}>
        <h1>Basic Signup Test</h1>
        <p>If you can see this page, routing is working in production.</p>
        
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <form action="/api/auth/register" method="POST">
            <div style={{ marginBottom: '15px' }}>
              <label>Username:</label><br />
              <input 
                type="text" 
                name="username" 
                required 
                minLength={3}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label>Password:</label><br />
              <input 
                type="password" 
                name="password" 
                required 
                minLength={8}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#000', 
                color: '#fff', 
                border: 'none',
                fontSize: '16px'
              }}
            >
              Create Account
            </button>
          </form>
          
          <p style={{ marginTop: '20px' }}>
            <a href="/login">Back to Login</a>
          </p>
        </div>

        <hr style={{ margin: '40px 0' }} />
        
        <h2>Debug Info</h2>
        <p>Test these URLs:</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li><a href="/api/test-signup">Test Signup API</a></li>
          <li><a href="/debug">Environment Debug</a></li>
          <li><a href="/signup-test">Full Debug Page</a></li>
          <li><a href="/signup">Original Signup Page</a></li>
        </ul>
      </body>
    </html>
  );
}