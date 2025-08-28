// Simple backup signup page - rename to page.tsx if needed
export default function SimpleSignupPage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Oravo Signup</h1>
      <p>Registration page is loading...</p>
      <form method="POST" action="/api/auth/register">
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            required 
            minLength={3}
            style={{ padding: '10px', margin: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            minLength={8}
            style={{ padding: '10px', margin: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <button 
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none' }}
          >
            Sign Up
          </button>
        </div>
      </form>
      <p><a href="/login">Back to Login</a></p>
    </div>
  );
}