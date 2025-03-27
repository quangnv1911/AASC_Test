import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const memberId = searchParams.get('member_id');
    
    if (token && memberId) {
      // Store the token and member_id
      login(memberId, token);
      navigate('/contacts', { replace: true });
    } else {
      setError('Authentication failed. Missing token or member ID.');
    }
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div className="auth-callback-error">
        <h2>Authentication Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>Return to Login</button>
      </div>
    );
  }

  return (
    <div className="auth-callback-loading">
      <h2>Completing Authentication</h2>
      <p>Please wait while we complete the authentication process...</p>
    </div>
  );
}

export default AuthCallback;